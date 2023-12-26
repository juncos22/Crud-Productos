import { Router } from "express";
import { getCategories } from "../controllers/categories.controller";

const categoriesRoute = Router();

categoriesRoute.get("/", getCategories);

export default categoriesRoute;
