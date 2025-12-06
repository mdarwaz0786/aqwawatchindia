import express from "express";
import { createOrder, getOrderById, getOrders, updateOrder } from "../../controllers/user/order.controller.js";
import protect from "../../middlewares/user/protect.middleware.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/", protect, getOrders);
router.get("/:id", protect, getOrderById);
router.patch("/:id", protect, updateOrder);

export default router;
