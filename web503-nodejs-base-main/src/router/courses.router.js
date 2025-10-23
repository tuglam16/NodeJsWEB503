import { Router } from "express";
import {
  addCourse,
  deleteCourse,
  getCourse,
  getCourseById,
  updateCourse,
} from "../controller/courses.controller";

const courseRouter = Router();

courseRouter.get("/", getCourse);
courseRouter.get("/:id", getCourseById);
courseRouter.post("/", addCourse);
courseRouter.put("/:id", updateCourse);
courseRouter.delete("/:id", deleteCourse);

export default courseRouter;
