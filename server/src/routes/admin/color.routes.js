import express from "express";
import {
  createColor,
  deleteColor,
  getColorById,
  getColors,
  updateColor
} from "../../controllers/admin/color.controller.js";
import protect from "../../middlewares/admin/protect.middleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  createColor
);

router.get("", protect, getColors);

router.get("/:id", protect, getColorById);

router.patch(
  "/:id",
  protect,
  updateColor
);

router.delete("/:id", protect, deleteColor);

export default router;
