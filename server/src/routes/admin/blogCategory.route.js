import express from "express";
import protect from "../../middlewares/admin/protect.middleware.js";
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";
import upload from "../../middlewares/multer.middleware.js";
import { createBlogCategory, deleteBlogCategory, getBlogCategories, getBlogCategoryById, updateBlogCategory } from "../../controllers/admin/blogCategory.controller.js";

const router = express.Router();

router.post(
  "/",
  protect,
  upload.fields([
    { name: "image", maxCount: 1 },
  ]),
  validateFileSize,
  createBlogCategory
);

router.get("", protect, getBlogCategories);

router.get("/:id", protect, getBlogCategoryById);

router.patch(
  "/:id",
  protect,
  upload.fields([
    { name: "image", maxCount: 1 },
  ]),
  validateFileSize,
  updateBlogCategory
);

router.delete("/:id", protect, deleteBlogCategory);

export default router;
