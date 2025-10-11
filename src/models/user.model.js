const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tên là bắt buộc"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email là bắt buộc"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Vui lòng cung cấp email hợp lệ",
      ],
    },
    password: {
      type: String,
      required: [true, "Mật khẩu là bắt buộc"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
