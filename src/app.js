import express from "express";
import router from "./routers";

const app = express();

// Middleware log thời gian + URL request
const logRequestTime = (req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
};
app.use(logRequestTime);

app.get("/", (req, res) => {
  res.send("Chào mừng đến với API sản phẩm!");
});

app.use("/api", router);
app.use(express.json());
app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:3000`);
});