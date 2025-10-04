import { Router } from "express";
import { addProduct, deleteProduct, getProduct, getProductById, updateProduct } from "../controllers/product.controller";

const productRouter = Router();


productRouter.get("/",getProduct);

productRouter.get("/:id",getProductById);

productRouter.post("/",addProduct);

productRouter.put("/:id",updateProduct);

productRouter.delete("/:id",deleteProduct);

export default productRouter;