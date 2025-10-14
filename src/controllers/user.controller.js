import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Joi from "joi";

export const registerUser = async (req, res) => {
  try {
    //  Joi validation
    const schema = Joi.object({
      name: Joi.string().min(2).max(100).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(128).required(),
    });

    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        ok: false,
        errors: error.details.map((d) => d.message),
      });
    }

    const { name, email, password } = value;

    //  Check trùng email
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing)
      return res.status(409).json({ ok: false, message: "Email đã tồn tại" });

    //  Hash password
    const hashed = await bcrypt.hash(password, 10);

    //  Lưu user
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashed,
    });

    //  Trả về thông tin user
    res.status(201).json({
      ok: true,
      message: "Đăng ký thành công",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: "Lỗi server" });
  }
};

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email không được để trống",
    "string.email": "Email không hợp lệ",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Mật khẩu không được để trống",
    "string.min": "Mật khẩu phải có ít nhất 6 ký tự",
  }),
});

export const loginUser = async (req, res) => {
  try {
    // Validate đầu vào
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    // Tìm user trong MongoDB
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email hoặc mật khẩu không đúng" });
    }

    //So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Email hoặc mật khẩu không đúng" });
    }

    // Tạo JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "secretKey",
      { expiresIn: "1h" }
    );

    //Trả kết quả thành công
    return res.status(200).json({
      message: "Đăng nhập thành công",
      token,
    });
  } catch (err) {
    //Lỗi server (DB hoặc logic)
    console.error("Lỗi đăng nhập:", err);
    return res
      .status(500)
      .json({ message: "Lỗi máy chủ, vui lòng thử lại sau" });
  }
};
