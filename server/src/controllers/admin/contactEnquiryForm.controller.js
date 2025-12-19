import ContactEnquiryFormModel from "../../models/contactEnquiryForm.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";

// --------------------- CREATE OR UPDATE (SINGLE DOCUMENT) ---------------------
export const createOrUpdateContactEnquiryForm = asyncHandler(async (req, res) => {
  let form = await ContactEnquiryFormModel.findOne();

  if (!form) {
    form = await ContactEnquiryFormModel.create({
      ...req.body,
      createdBy: req.user?._id,
    });

    return res.status(201).json({
      success: true,
      message: "Created successfully",
      data: form,
    });
  };

  Object.keys(req.body).forEach((key) => {
    form[key] = req.body[key];
  });

  form.updatedBy = req.user?._id;
  form.updatedAt = new Date();

  await form.save();

  return res.status(200).json({
    success: true,
    message: "Updated successfully",
    data: form,
  });
});

// --------------------- GET SINGLE ---------------------
export const getContactEnquiryForm = asyncHandler(async (req, res) => {
  const form = await ContactEnquiryFormModel.findOne().lean();

  if (!form) {
    throw new ApiError(404, "Contact enquiry form not found");
  }

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: form,
  });
});
