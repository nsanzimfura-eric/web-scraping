import express from "express";
import ProductsController from "../controllers/products.controller";

const ProductsRoutes = express.Router();

//super_admin or an other admin creates an admin using queries
ProductsRoutes.get("/", ProductsController.getAllProducts);

export default ProductsRoutes;
