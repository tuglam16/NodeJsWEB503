import express from "express";
import productRouter from "./routers/products.router";
import userRouter from "./routers/users";
import postRouter from "./routers/posts";
import mongoose from "mongoose";
import authorRouter from "./routers/author.router";

const app = express();

// Middleware log thời gian + URL request
const logRequestTime = (req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
};
app.use(logRequestTime);
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/nodejs")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

app.get("/", (req, res) => {
  res.send("Chào mừng đến với API sản phẩm!");
});


// Định nghĩa route GET /

// .get : Method HTTP: GET
// "/": Endpoint API - URL
// function (req, res) :
// req: du lieu gui tu client (Frontend)
// res: du lieu server tra ve cho client (FE)
// app.get("/", (req, res) => {
  //   res.send("Hello, chao cac ban");
  // });
  
  
  app.use("/api/posts",postRouter)
  app.use("/api/users",userRouter)
  app.use("/api/products",productRouter)
  app.use("/api/author",authorRouter)
  
  
  
  app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:3000`);
});