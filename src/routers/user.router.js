import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/auth.middleware";
import { getProfile } from "../controllers/auth.controller";

const userRouter = Router();
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", verifyToken, getProfile);

export default userRouter;
