import { Router } from "express";

const postRouter = Router();
// Fake data lưu tạm trong mảng
let posts = [
    { id: 1, title: "Bài viết 1", content: "Nội dung bài viết 1" },
    { id: 2, title: "Bài viết 2", content: "Nội dung bài viết 2" },
];
postRouter.get("/", (req,res)=>{
    res.json(posts)
})
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
postRouter.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).json({ message: "Không tìm thấy bài viết" });
  }

  res.json(post);
});

// 3. POST /api/posts - Thêm bài viết mới
postRouter.post("/", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Thiếu title hoặc content" });
  }

  const newPost = {
    id: posts.length ? posts[posts.length - 1].id + 1 : 1,
    title,
    content,
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

// 4. PUT /api/posts/:id - Cập nhật bài viết theo id
postRouter.put("/:id", (req, res) => {
    const post = posts.find((p) => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).json({ error: "Post not found" });

    const { title, content } = req.body;
    post.title = title || post.title;
    post.content = content || post.content;

    res.json(post);
});
// 5. DELETE /api/posts/:id - Xóa bài viết theo id
postRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Không tìm thấy bài viết" });
  }

  const deletedPost = posts.splice(index, 1);
  res.json(deletedPost[0]);
});


// postRouter.get("/detail/:id",(req,res)=>{
//         console.log(req.params?.id);
//     res.send("Post detail co id la :" + req.params?.id)
// });

postRouter.post("/", (req,res)=>{
    res.send(req.body)
    res.json({body: req.body})
})

export default postRouter;