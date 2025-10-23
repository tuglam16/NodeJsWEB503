import { defaults, required } from "joi";
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    couresName: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Course = mongoose.model("Courses", courseSchema);
export default Course;
