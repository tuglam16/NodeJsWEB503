import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Kiểm tra header có token không
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Thiếu token hoặc không hợp lệ" });
    }

    // Lấy token từ header
    const token = authHeader.split(" ")[1];

    // Xác thực token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretKey");

    // Tìm user theo id trong token
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "Không tìm thấy user" });

    // Gắn user vào request để controller có thể dùng
    req.user = user;
    next();
  } catch (err) {
    console.error("Token error:", err);
    return res
      .status(401)
      .json({ message: "Token không hợp lệ hoặc đã hết hạn" });
  }
};
