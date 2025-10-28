import express from "express";
import {
  createSubSubCategory,
  deleteSubSubCategory,
  getSubSubCategories,
  getSubSubCategoryById,
  updateSubSubCategory
} from "../../controllers/admin/subSubCategory.controller.js";
import protect from "../../middlewares/admin/protect.middleware.js";
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";
import upload from "../../middlewares/multer.middleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "icon", maxCount: 1 }
  ]),
  validateFileSize,
  createSubSubCategory
);

router.get("", protect, getSubSubCategories);

router.get("/:id", protect, getSubSubCategoryById);

router.patch(
  "/:id",
  protect,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "icon", maxCount: 1 }
  ]),
  validateFileSize,
  updateSubSubCategory
);

router.delete("/:id", protect, deleteSubSubCategory);

export default router;
