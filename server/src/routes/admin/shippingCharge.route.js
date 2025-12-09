import express from "express";
import protect from "../../middlewares/admin/protect.middleware.js";
import {
  createShippingCharge,
  deleteShippingCharge,
  getShippingChargeById,
  getShippingCharges,
  updateShippingCharge
} from "../../controllers/admin/shippingCharge.controller.js";

const router = express.Router();

router.post(
  "/",
  protect,
  createShippingCharge
);

router.get("", protect, getShippingCharges);

router.get("/:id", protect, getShippingChargeById);

router.patch(
  "/:id",
  protect,
  updateShippingCharge
);

router.delete("/:id", protect, deleteShippingCharge);

export default router;
