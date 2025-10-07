import { Router } from "express";
import { createAuthor, deleteAuthor, getAuthorById, getAuthors, updateAuthor } from "../controllers/author.controller";

const authorRouter = Router();


authorRouter.get("/", getAuthors);
authorRouter.get("/:id", getAuthorById);
authorRouter.post("/", createAuthor);
authorRouter.put("/:id", updateAuthor);
authorRouter.delete("/:id", deleteAuthor);



export default authorRouter;


