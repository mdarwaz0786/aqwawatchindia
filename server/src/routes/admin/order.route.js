import express from "express";
import { deleteOrder, getOrderById, getOrders, updateOrder } from "../../controllers/admin/order.controller.js";
import protect from "../../middlewares/admin/protect.middleware.js";

const router = express.Router();

router.get("/", protect, getOrders);
router.get("/:id", protect, getOrderById);
router.patch("/:id", protect, updateOrder);
router.delete("/:id", protect, deleteOrder);

export default router;
