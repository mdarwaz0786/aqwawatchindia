import express from "express";
import protect from "../../middlewares/admin/protect.middleware.js";
import { createTestimonial, deleteTestimonial, getTestimonialById, getTestimonials, updateTestimonial } from "../../controllers/admin/testimonial.controller.js";

const router = express.Router();

router.post(
  "/",
  protect,
  createTestimonial
);

router.get("", protect, getTestimonials);

router.get("/:id", protect, getTestimonialById);

router.patch(
  "/:id",
  protect,
  updateTestimonial
);

router.delete("/:id", protect, deleteTestimonial);

export default router;
