import express from "express";
import protect from "../../middlewares/admin/protect.middleware.js";
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";
import upload from "../../middlewares/multer.middleware.js";
import { createClient, deleteClient, getClientById, getClients, updateClient } from "../../controllers/admin/client.controller.js";

const router = express.Router();

router.post(
  "/",
  protect,
  upload.fields([
    { name: "logo", maxCount: 1 },
  ]),
  validateFileSize,
  createClient
);

router.get("", protect, getClients);

router.get("/:id", protect, getClientById);

router.patch(
  "/:id",
  protect,
  upload.fields([
    { name: "logo", maxCount: 1 },
  ]),
  validateFileSize,
  updateClient
);

router.delete("/:id", protect, deleteClient);

export default router;
