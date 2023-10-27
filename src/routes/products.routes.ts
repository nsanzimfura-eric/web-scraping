import express from "express";
import ProductsController from "../controllers/products.controller";

const ProductsRoutes = express.Router();

//get all products from scraped page
ProductsRoutes.get("/", ProductsController.getAllProducts);

export default ProductsRoutes;
