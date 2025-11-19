import TestimonialModel from "../../models/testimonial.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

export const createTestimonial = asyncHandler(async (req, res) => {
  const { userName, description, rating } = req.body;

  if (!userName) throw new ApiError(400, "User name is required");
  if (!description) throw new ApiError(400, "Description is required");

  const testimonial = await TestimonialModel.create({
    userName,
    description,
    rating,
    createdBy: req.user?._id,
  });

  return res.status(201).json({ success: true, data: testimonial });
});

export const getTestimonials = asyncHandler(async (req, res) => {
  let { search, status, sort = "desc", page, limit } = req.query;

  page = parseInt(page, 10) || 1;
  limit = parseInt(limit, 10) || 10;
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) filters.$or = [{ userName: { $regex: search, $options: "i" } }];
  if (status === "true" || status === "false") filters.status = status === "true";

  let sortOption = {};
  if (sort === "asc") sortOption = { createdAt: 1 };
  else if (sort === "desc") sortOption = { createdAt: -1 };
  else sortOption = sort;

  const testimonials = await TestimonialModel.find(filters)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await TestimonialModel.countDocuments(filters);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: testimonials,
    pagination: buildPagination({ page, limit, total }),
  });
});

export const getTestimonialById = asyncHandler(async (req, res) => {
  const testimonial = await TestimonialModel.findById(req.params.id);
  if (!testimonial) throw new ApiError(404, "Testimonial not found");

  return res.status(200).json({ success: true, data: testimonial });
});

export const updateTestimonial = asyncHandler(async (req, res) => {
  const { userName, description, rating, status } = req.body;

  const testimonial = await TestimonialModel.findById(req.params.id);
  if (!testimonial) throw new ApiError(404, "Testimonial not found");

  testimonial.userName = userName || testimonial.userName;
  testimonial.description = description || testimonial.description;
  testimonial.rating = rating || testimonial.rating;
  testimonial.status = typeof status === "boolean" ? status : testimonial.status;
  testimonial.updatedBy = req.user?._id;
  testimonial.updatedAt = new Date();

  await testimonial.save();

  return res.status(200).json({ success: true, message: "Updated Successfully", data: testimonial });
});

export const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await TestimonialModel.findById(req.params.id);
  if (!testimonial) throw new ApiError(404, "Testimonial not found");

  await testimonial.deleteOne();

  return res.status(200).json({ success: true, message: "Deleted successfully" });
});
