import express from "express";
import protect from "../../middlewares/admin/protect.middleware.js";
import {
  createContactEnquiry,
  deleteContactEnquiry,
  getContactEnquiries,
  getContactEnquiryById,
  updateContactEnquiry,
} from "../../controllers/admin/contactEnquiry.controller.js";

const router = express.Router();

router.post("/", createContactEnquiry);
router.get("/", protect, getContactEnquiries);
router.get("/:id", protect, getContactEnquiryById);
router.patch("/:id", protect, updateContactEnquiry);
router.delete("/:id", protect, deleteContactEnquiry);

export default router;
