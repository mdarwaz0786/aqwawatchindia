import express from "express";
import protect from "../../middlewares/admin/protect.middleware.js";
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";
import upload from "../../middlewares/multer.middleware.js";
import {
  createOrUpdateContactUs,
  deleteContactUs,
  getContactUs,
} from "../../controllers/admin/contactus.controller.js";

const router = express.Router();

router.post(
  "/",
  protect,
  upload.fields([
    { name: "image", maxCount: 1 },
  ]),
  validateFileSize,
  createOrUpdateContactUs,
);

router.get("", getContactUs);

router.delete("/:id", protect, deleteContactUs);

export default router;
