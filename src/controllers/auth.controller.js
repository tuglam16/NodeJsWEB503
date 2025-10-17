export const getProfile = async (req, res) => {
  try {
    // req.user đã được gắn từ middleware
    return res.status(200).json({
      ok: true,
      user: req.user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, message: "Lỗi server" });
  }
};
