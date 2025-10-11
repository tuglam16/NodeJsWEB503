const bcrypt = require("bcrypt");
const Joi = require("joi");
const User = require("../models/user.model");

// [POST] /api/users/register
const registerUser = async (req, res) => {
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

module.exports = { registerUser };
