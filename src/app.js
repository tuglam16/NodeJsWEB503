import express from "express";
import router from "./routers";

const app = express();

app.use("/api", router);
app.use(express.json());
app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:3000`);
});