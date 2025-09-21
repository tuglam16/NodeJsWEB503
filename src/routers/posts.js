import { Router } from "express";

const postRouter = Router();
postRouter.get("/", (req,res)=>{
    res.send("Post")
})
postRouter.get("/greet", (req,res)=>{
        console.log(req.query?.name);
    res.send("Hello :" + req.query?.name)
})

postRouter.get("/sum", (req, res) => {
  const { a, b } = req.query;
  const numA = Number(a);
  const numB = Number(b);

  if (isNaN(numA) || isNaN(numB)) {
    return res.status(400).send("a và b phải là số");
  }

  res.send(`Tổng của ${numA} + ${numB} = ${numA + numB}`);
});

postRouter.get("/detail/:id",(req,res)=>{
        console.log(req.params?.id);
    res.send("Post detail co id la :" + req.params?.id)
});

export default postRouter;