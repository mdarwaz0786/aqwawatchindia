import express from "express";
import { createBlog, deleteBlog, getBlogById, getBlogs, updateBlog } from "../../controllers/admin/blog.controller.js";
import protect from "../../middlewares/admin/protect.middleware.js";
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";
import upload from "../../middlewares/multer.middleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  upload.fields([
    { name: "frontImage", maxCount: 1 },
    { name: "detailImage", maxCount: 1 },
  ]),
  validateFileSize,
  createBlog
);

router.get("", protect, getBlogs);

router.get("/:id", protect, getBlogById);

router.patch(
  "/:id",
  protect,
  upload.fields([
    { name: "frontImage", maxCount: 1 },
    { name: "detailImage", maxCount: 1 },
  ]),
  validateFileSize,
  updateBlog
);

router.delete("/:id", protect, deleteBlog);

export default router;
