import express from "express";
import ProductsRoutes from "./products.routes";

const router = express.Router();

router.use("/products", ProductsRoutes);
//add a route

router.use("*", (req, res) => {
  res.status(404).json({
    code: 404,
    message: "Not Found",
  });
});

export default router;
