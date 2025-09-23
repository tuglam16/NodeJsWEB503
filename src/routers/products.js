import { Router } from "express";

const productRouter = Router();

const products = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Phone", price: 400 },
  { id: 3, name: "Tablet", price: 600 },
  { id: 4, name: "Mouse", price: 50 },
];

productRouter.get("/", (req, res) => {
  const { maxPrice } = req.query;
  let result = products;

  if (maxPrice) {
    result = products.filter((p) => p.price <= Number(maxPrice));
  }

  res.json(result);
});

productRouter.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ error: "Không tìm thấy sản phẩm với ID này" });
  }

  res.json(product);
});

productRouter.get("/search", (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res
      .status(400)
      .json({ error: "Bạn cần truyền query ?name=..." });
  }

  const result = products.filter((p) =>
    p.name.toLowerCase().includes(name.toLowerCase())
  );

  res.json(result);
});

export default productRouter;