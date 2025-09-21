import { Router } from "express";
import postRouter from "./posts.js";
import productRouter from "./products.js";
import userRouter from "./users.js";
const router = Router();
// Định nghĩa route GET /

// .get : Method HTTP: GET
// "/": Endpoint API - URL
// function (req, res) :
// req: du lieu gui tu client (Frontend)
// res: du lieu server tra ve cho client (FE)
// app.get("/", (req, res) => {
//   res.send("Hello, chao cac ban");
// });

router.get("/",(req,res)=>{
    console.log(req.query?.name);
    res.send("Hello :" + req.query?.name)
})

router.use("/posts",postRouter)
router.use("/users",userRouter)
router.use("/products",productRouter)



export default router;