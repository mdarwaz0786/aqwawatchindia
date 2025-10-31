import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
} from "../../controllers/admin/product.controller.js";
import protect from "../../middlewares/admin/protect.middleware.js";
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";
import upload from "../../middlewares/multer.middleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  upload.any(),
  validateFileSize,
  createProduct
);

router.put(
  "/:id",
  protect,
  upload.any(),
  validateFileSize,
  updateProduct,
);

router.delete("/:id", protect, deleteProduct);

router.get("/", protect, getAllProducts);

router.get("/:id", protect, getProductById);

export default router;
