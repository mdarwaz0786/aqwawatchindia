import BlogModel from "../../models/blog.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

export const getBlogs = asyncHandler(async (req, res) => {
  let { search, category, status, sort = "desc", page, limit } = req.query;

  page = parseInt(page, 10) || 1;
  limit = parseInt(limit, 10) || 10;
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) filters.$or = [{ title: { $regex: search, $options: "i" } }];
  if (category) filters.category = category;
  if (status === "true" || status === "false") filters.status = status === "true";

  let sortOption = {};
  if (sort === "asc") sortOption = { createdAt: 1 };
  else if (sort === "desc") sortOption = { createdAt: -1 };
  else sortOption = sort;

  const blogs = await BlogModel.find(filters)
    .populate({ path: "category", strictPopulate: false })
    .populate("createdBy", "name")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await BlogModel.countDocuments(filters);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: blogs,
    pagination: buildPagination({ page, limit, total }),
  });
});

export const getBlogById = asyncHandler(async (req, res) => {
  const blog = await BlogModel.findById(req.params.id)
    .populate({ path: "category", strictPopulate: false }).populate("createdBy", "name").lean()

  if (!blog) throw new ApiError(404, "Blog not found");

  return res.status(200).json({ success: true, data: blog });
});
