import { Router } from "express";
import { getPost,getPostById,addPost,updatePost,deletePost } from "../controllers/post";
const postRouter = Router();
// Fake data lưu tạm trong mảng

postRouter.get("/",getPost)
// postRouter.get("/greet", (req,res)=>{
//         console.log(req.query?.name);
//     res.send("Hello :" + req.query?.name)
// })

// postRouter.get("/sum", (req, res) => {
//   const { a, b } = req.query;
//   const numA = Number(a);
//   const numB = Number(b);

//   if (isNaN(numA) || isNaN(numB)) {
//     return res.status(400).send("a và b phải là số");
//   }

//   res.send(`Tổng của ${numA} + ${numB} = ${numA + numB}`);
// });


// 2. GET /api/posts/:id - Lấy chi tiết bài viết theo id
postRouter.get("/:id", getPostById);

// 3. POST /api/posts - Thêm bài viết mới
postRouter.post("/",addPost);

// 4. PUT /api/posts/:id - Cập nhật bài viết theo id
postRouter.put("/:id",updatePost);
// 5. DELETE /api/posts/:id - Xóa bài viết theo id
postRouter.delete("/:id",deletePost);


// postRouter.get("/detail/:id",(req,res)=>{
//         console.log(req.params?.id);
//     res.send("Post detail co id la :" + req.params?.id)
// });

postRouter.post("/", (req,res)=>{
    res.send(req.body)
    res.json({body: req.body})
})

export default postRouter;