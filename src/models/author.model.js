import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 100 },
  bio: { type: String, maxlength: 500 },
}, { timestamps: true });

export default mongoose.model("Author", authorSchema);
