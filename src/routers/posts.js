import { Router } from "express";
import { getPost,getPostById,addPost,updatePost,deletePost,searchPost } from "../controllers/post";
const postRouter = Router();
// Fake data lưu tạm trong mảng

postRouter.get("/",getPost)

// 2. GET /api/posts/:id - Lấy chi tiết bài viết theo id
postRouter.get("/:id", getPostById);

// 3. POST /api/posts - Thêm bài viết mới
postRouter.post("/",addPost);

// 4. PUT /api/posts/:id - Cập nhật bài viết theo id
postRouter.put("/:id",updatePost);
// 5. DELETE /api/posts/:id - Xóa bài viết theo id
postRouter.delete("/:id",deletePost);



export default postRouter;