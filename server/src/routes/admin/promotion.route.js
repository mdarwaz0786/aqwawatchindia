import express from "express";
import protect from "../../middlewares/admin/protect.middleware.js";
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";
import upload from "../../middlewares/multer.middleware.js";
import { createPromotion, deletePromotion, getPromotionById, getPromotions, updatePromotion } from "../../controllers/admin/promotion.controller.js";

const router = express.Router();

router.post(
  "/",
  protect,
  upload.fields([
    { name: "banner", maxCount: 1 },
  ]),
  validateFileSize,
  createPromotion
);

router.get("", protect, getPromotions);

router.get("/:id", protect, getPromotionById);

router.patch(
  "/:id",
  protect,
  upload.fields([
    { name: "banner", maxCount: 1 },
  ]),
  validateFileSize,
  updatePromotion
);

router.delete("/:id", protect, deletePromotion);

export default router;
