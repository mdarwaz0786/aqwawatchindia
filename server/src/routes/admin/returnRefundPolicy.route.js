import express from "express";
import ReturnRefundPolicyModel from "../../models/returnRefundPolicy.model.js";
import { singleDocumentController } from "../../controllers/admin/singleDocument.controller.js";
import protect from "../../middlewares/admin/protect.middleware.js";

const router = express.Router();

const {
  createOrUpdate,
  get,
  delete: deleteRecord
} = singleDocumentController(ReturnRefundPolicyModel);

router.post("/", protect, createOrUpdate);
router.get("/", get);
router.delete("/", protect, deleteRecord);

export default router;
