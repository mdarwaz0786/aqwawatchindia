import express from "express";
import { createAddress, deleteAddress, getAddressById, getAddresses, updateAddress } from "../../controllers/user/address.controller.js";
import protect from "../../middlewares/user/protect.middleware.js";

const router = express.Router();

router.post("/", protect, createAddress);
router.get("/", protect, getAddresses);
router.get("/:id", protect, getAddressById);
router.patch("/:id", protect, updateAddress);
router.delete("/:id", protect, deleteAddress);

export default router;
