import express from "express";
import {
  createSize,
  deleteSize,
  getSizeById,
  getSizes,
  updateSize
} from "../../controllers/admin/size.controller.js";
import protect from "../../middlewares/admin/protect.middleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  createSize
);

router.get("", protect, getSizes);

router.get("/:id", protect, getSizeById);

router.patch(
  "/:id",
  protect,
  updateSize
);

router.delete("/:id", protect, deleteSize);

export default router;
