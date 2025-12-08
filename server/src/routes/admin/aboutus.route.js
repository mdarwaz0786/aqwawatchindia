import express from "express";
import protect from "../../middlewares/admin/protect.middleware.js";
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";
import upload from "../../middlewares/multer.middleware.js";
import {
  createOrUpdateAboutUs,
  deleteAboutUs,
  getAboutUs
} from "../../controllers/admin/aboutus.controller.js";

const router = express.Router();

router.post(
  "/",
  protect,
  upload.fields([
    { name: "image", maxCount: 1 },
  ]),
  validateFileSize,
  createOrUpdateAboutUs,
);

router.get("", getAboutUs);

router.delete("/:id", protect, deleteAboutUs);

export default router;
