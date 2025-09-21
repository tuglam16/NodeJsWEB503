import { Router } from "express";

const userRouter = Router();
userRouter.get("/", (req,res)=>{
    res.send("user");
})
userRouter.get("/greet",(req,res)=>{
    res.send("user greet")
});

export default userRouter;