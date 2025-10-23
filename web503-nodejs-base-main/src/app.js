import express from "express";
import mongoose from "mongoose";
import courseRouter from "./router/courses.router";

const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/kiemtra_nodejs_fa25")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

app.use("/courses", courseRouter);

app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:3000`);
});
