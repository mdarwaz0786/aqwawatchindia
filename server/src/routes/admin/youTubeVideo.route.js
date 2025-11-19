import express from "express";
import protect from "../../middlewares/admin/protect.middleware.js";
import { createYouTubeVideo, deleteYouTubeVideo, getYouTubeVideoById, getYouTubeVideos, updateYouTubeVideo } from "../../controllers/admin/youTubeVideo.controller.js";

const router = express.Router();

router.post(
  "/",
  protect,
  createYouTubeVideo
);

router.get("", protect, getYouTubeVideos);

router.get("/:id", protect, getYouTubeVideoById);

router.patch(
  "/:id",
  protect,
  updateYouTubeVideo
);

router.delete("/:id", protect, deleteYouTubeVideo);

export default router;
