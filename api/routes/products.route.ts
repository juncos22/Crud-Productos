import { Router } from "express";
import {
  deleteProduct,
  getAllProducts,
  getProduct,
  saveProduct,
  updateProduct,
} from "../controllers/products.controller";

const productsRoute = Router();

productsRoute.post("/products", saveProduct);
productsRoute.get("/products", getAllProducts);
productsRoute.get("/products/:id", getProduct);
productsRoute.put("/products/:id", updateProduct);
productsRoute.delete("/products/:id", deleteProduct);

export default productsRoute;
