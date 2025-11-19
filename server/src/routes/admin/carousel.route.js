import express from "express";
import protect from "../../middlewares/admin/protect.middleware.js";
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";
import upload from "../../middlewares/multer.middleware.js";
import { createCarousel, deleteCarousel, getCarouselById, getCarousels, updateCarousel } from "../../controllers/admin/carousel.controller.js";

const router = express.Router();

router.post(
  "/",
  protect,
  upload.fields([
    { name: "banner", maxCount: 1 },
  ]),
  validateFileSize,
  createCarousel
);

router.get("", protect, getCarousels);

router.get("/:id", protect, getCarouselById);

router.patch(
  "/:id",
  protect,
  upload.fields([
    { name: "banner", maxCount: 1 },
  ]),
  validateFileSize,
  updateCarousel
);

router.delete("/:id", protect, deleteCarousel);

export default router;
