import express from "express";
import { getShippingChargeByState } from "../../controllers/user/shippingCharge.controller.js";

const router = express.Router();

router.get("/:state", getShippingChargeByState);

export default router;
