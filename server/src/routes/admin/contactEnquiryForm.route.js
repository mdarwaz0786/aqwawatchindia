import express from "express";
import protect from "../../middlewares/admin/protect.middleware.js";
import { createOrUpdateContactEnquiryForm, getContactEnquiryForm } from "../../controllers/admin/contactEnquiryForm.controller.js";

const router = express.Router();

router.post(
  "/",
  protect,
  createOrUpdateContactEnquiryForm,
);

router.get("/", getContactEnquiryForm);

export default router;
