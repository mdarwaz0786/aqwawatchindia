import ColorModel from "../../models/color.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// --------------------- CREATE COLOR ---------------------
export const createColor = asyncHandler(async (req, res) => {
  const { name, colorCode } = req.body;

  if (!name) {
    throw new ApiError(400, "Name is required");
  }

  const color = await ColorModel.create({
    name,
    colorCode,
    createdBy: req.user?._id,
  });

  return res.status(201).json({
    success: true,
    message: "Color created successfully",
    data: color,
  });
});

// --------------------- GET ALL COLORS ---------------------
export const getColors = asyncHandler(async (req, res) => {
  let { search, status, sort = "desc", page, limit } = req.query;

  page = parseInt(page, 10) || 1;
  limit = parseInt(limit, 10) || 10;
  const skip = (page - 1) * limit;

  const filters = {};

  if (search) {
    filters.$or = [
      { name: { $regex: search, $options: "i" } },
      { colorCode: { $regex: search, $options: "i" } },
    ];
  }

  if (status !== undefined) {
    filters.status = status === "true";
  }

  let sortOption = {};
  if (sort === "asc") {
    sortOption = { createdAt: 1 };
  } else if (sort === "desc") {
    sortOption = { createdAt: -1 };
  } else {
    sortOption = sort;
  }

  const colors = await ColorModel.find(filters)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await ColorModel.countDocuments(filters);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: colors,
    pagination: buildPagination({ page, limit, total }),
  });
});


// --------------------- GET SINGLE COLOR ---------------------
export const getColorById = asyncHandler(async (req, res) => {
  const color = await ColorModel.findById(req.params.id);

  if (!color) {
    throw new ApiError(404, "Color not found");
  }

  return res.status(200).json({
    success: true,
    data: color,
  });
});

// --------------------- UPDATE COLOR ---------------------
export const updateColor = asyncHandler(async (req, res) => {
  const { name, colorCode, status } = req.body;

  const color = await ColorModel.findById(req.params.id);
  if (!color) {
    throw new ApiError(404, "Color not found");
  }

  color.name = name || color.name;
  color.colorCode = colorCode || color.colorCode;
  color.status = typeof status === "boolean" ? status : color.status;
  color.updatedBy = req.user?._id;
  color.updatedAt = new Date();

  await color.save();

  return res.status(200).json({
    success: true,
    message: "Updated successfully",
    data: color,
  });
});

// --------------------- DELETE COLOR ---------------------
export const deleteColor = asyncHandler(async (req, res) => {
  const color = await ColorModel.findById(req.params.id);
  if (!color) {
    throw new ApiError(404, "Color not found");
  }

  await color.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Deleted successfully",
  });
});
