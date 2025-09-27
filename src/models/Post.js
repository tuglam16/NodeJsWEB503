import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  }
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", // tham chiếu tới bảng Category
    required: true,
  }
}, { timestamps: true });

const Category = mongoose.model("Category", categorySchema);
const Product = mongoose.model("Product", productSchema);

export { Category, Product };
