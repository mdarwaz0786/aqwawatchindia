import express from "express";
import CookiePolicyModel from "../../models/cookiePolicy.model.js";
import { singleDocumentController } from "../../controllers/admin/singleDocument.controller.js";
import protect from "../../middlewares/admin/protect.middleware.js";

const router = express.Router();

const {
  createOrUpdate,
  get,
  delete: deleteRecord
} = singleDocumentController(CookiePolicyModel);

router.post("/", protect, createOrUpdate);
router.get("/", get);
router.delete("/", protect, deleteRecord);

export default router;
