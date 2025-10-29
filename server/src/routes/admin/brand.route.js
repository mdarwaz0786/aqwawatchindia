import express from "express";
import {
  createBrand,
  deleteBrand,
  getBrandById,
  getBrands,
  updateBrand
} from "../../controllers/admin/brand.controller.js";
import protect from "../../middlewares/admin/protect.middleware.js";
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";
import upload from "../../middlewares/multer.middleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  upload.fields([
    { name: "logo", maxCount: 1 },
  ]),
  validateFileSize,
  createBrand
);

router.get("", protect, getBrands);

router.get("/:id", protect, getBrandById);

router.patch(
  "/:id",
  protect,
  upload.fields([
    { name: "logo", maxCount: 1 },
  ]),
  validateFileSize,
  updateBrand
);

router.delete("/:id", protect, deleteBrand);

export default router;
