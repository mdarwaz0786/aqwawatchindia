import express from "express";
import {
  getProducts,
  getProductById,
  getRelatedProducts,
  getRelatedProductsByCategory,
} from "../../controllers/user/product.controller.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProductById);
router.get("/related/:slug", getRelatedProducts);
router.get("/related-category/:slug", getRelatedProductsByCategory);

export default router;
