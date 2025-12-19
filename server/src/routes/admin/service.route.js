import express from "express";
import protect from "../../middlewares/admin/protect.middleware.js";
import { createService, deleteService, getServiceById, getServices, updateService } from "../../controllers/admin/service.controller.js";

const router = express.Router();

router.post(
  "/",
  protect,
  createService
);

router.get("/", getServices);

router.get("/:id", protect, getServiceById);

router.patch(
  "/:id",
  protect,
  updateService
);

router.delete("/:id", protect, deleteService);

export default router;
