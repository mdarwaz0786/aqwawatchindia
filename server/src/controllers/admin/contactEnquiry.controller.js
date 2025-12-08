import ContactEnquiryModel from "../../models/contactEnquiry.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

export const createContactEnquiry = asyncHandler(async (req, res) => {
  const { name, mobile, email, subject, message, service, from, country, state, city, zip, address } = req.body;

  const data = await ContactEnquiryModel.create({
    name,
    mobile,
    email,
    subject,
    message,
    from,
    service,
    country,
    state,
    city,
    zip,
    address,
    createdBy: req.user?._id,
  });

  return res.status(201).json({
    success: true,
    message: "Created successfully",
    data,
  });
});

export const getContactEnquiries = asyncHandler(async (req, res) => {
  let { search, from, status, sort = "desc", page, limit } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};

  if (search) {
    filters.$or = [
      { name: { $regex: search, $options: "i" } },
      { mobile: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  if (status !== undefined) {
    filters.status = status === "true";
  }

  if (from !== undefined) {
    filters.from = from;
  }

  let sortOption = {};
  if (sort === "asc") sortOption = { createdAt: 1 };
  else sortOption = { createdAt: -1 };

  const data = await ContactEnquiryModel.find(filters)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await ContactEnquiryModel.countDocuments(filters);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data,
    pagination: buildPagination({ page, limit, total }),
  });
});

export const getContactEnquiryById = asyncHandler(async (req, res) => {
  const data = await ContactEnquiryModel.findById(req.params.id);

  if (!data) {
    throw new ApiError(404, "Contact enquiry not found");
  }

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data,
  });
});

export const updateContactEnquiry = asyncHandler(async (req, res) => {
  const { name, mobile, email, subject, message, from, country, state, city, zip, address, status } = req.body;

  const data = await ContactEnquiryModel.findById(req.params.id);
  if (!data) {
    throw new ApiError(404, "Contact enquiry not found");
  }

  data.name = name || data.name;
  data.mobile = mobile || data.mobile;
  data.email = email || data.email;
  data.subject = subject || data.subject;
  data.message = message || data.message;
  data.service = service || data.service;
  data.from = from || data.from;
  data.country = country || data.country;
  data.state = state || data.state;
  data.city = city || data.city;
  data.zip = zip || data.zip;
  data.address = address || data.address;
  data.status = typeof status === "boolean" ? status : data.status;
  data.updatedBy = req.user?._id;
  data.updatedAt = new Date();

  await data.save();

  return res.status(200).json({
    success: true,
    message: "Updated successfully",
    data,
  });
});

export const deleteContactEnquiry = asyncHandler(async (req, res) => {
  const data = await ContactEnquiryModel.findById(req.params.id);
  if (!data) {
    throw new ApiError(404, "Contact enquiry not found");
  }

  await data.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Deleted successfully",
  });
});
