import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById,
} from "../../controllers/admin/product.controller.js";
import protect from "../../middlewares/admin/protect.middleware.js";
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";
import upload from "../../middlewares/multer.middleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  upload.fields([
    { name: "images", maxCount: 100 },
    { name: "video", maxCount: 1 },
  ]),
  validateFileSize,
  createProduct
);

router.patch(
  "/:id",
  protect,
  upload.fields([
    { name: "images", maxCount: 100 },
    { name: "video", maxCount: 1 },
  ]),
  validateFileSize,
  updateProduct,
);

router.delete("/:id", protect, deleteProduct);

router.get("/", protect, getProducts);

router.get("/:id", protect, getProductById);

export default router;
