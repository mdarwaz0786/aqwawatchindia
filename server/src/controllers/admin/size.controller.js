import SizeModel from "../../models/size.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// --------------------- CREATE SIZE ---------------------
export const createSize = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    throw new ApiError(400, "Name is required");
  }

  const size = await SizeModel.create({
    name,
    createdBy: req.user?._id,
  });

  return res.status(201).json({
    success: true,
    message: "Created successfully",
    data: size,
  });
});

// --------------------- GET ALL SIZES ---------------------
export const getSizes = asyncHandler(async (req, res) => {
  let { search, status, sort = "desc", page, limit } = req.query;

  page = parseInt(page, 10) || 1;
  limit = parseInt(limit, 10) || 10;
  const skip = (page - 1) * limit;

  const filters = {};

  if (search) {
    filters.name = { $regex: search, $options: "i" };
  }

  if (status !== undefined) {
    filters.status = status === "true" || status === true;
  }

  let sortOption = {};
  if (sort === "asc") {
    sortOption = { createdAt: 1 };
  } else if (sort === "desc") {
    sortOption = { createdAt: -1 };
  } else {
    sortOption = sort;
  }

  const sizes = await SizeModel
    .find(filters)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await SizeModel.countDocuments(filters);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: sizes,
    pagination: buildPagination({ page, limit, total }),
  });
});

// --------------------- GET SINGLE SIZE ---------------------
export const getSizeById = asyncHandler(async (req, res) => {
  const size = await SizeModel.findById(req.params.id);

  if (!size) {
    throw new ApiError(404, "Size not found");
  }

  return res.status(200).json({
    success: true,
    data: size,
  });
});

// --------------------- UPDATE SIZE ---------------------
export const updateSize = asyncHandler(async (req, res) => {
  const { name, status } = req.body;

  const size = await SizeModel.findById(req.params.id);
  if (!size) {
    throw new ApiError(404, "Size not found");
  }

  size.name = name || size.name;
  size.status = typeof status === "boolean" ? status : size.status;
  size.updatedBy = req.user?._id;
  size.updatedAt = new Date();

  await size.save();

  return res.status(200).json({
    success: true,
    message: "Updated successfully",
    data: size,
  });
});

// --------------------- DELETE SIZE ---------------------
export const deleteSize = asyncHandler(async (req, res) => {
  const size = await SizeModel.findById(req.params.id);
  if (!size) {
    throw new ApiError(404, "Size not found");
  }

  await size.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Deleted successfully",
  });
});
