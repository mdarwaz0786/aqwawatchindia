import ServiceModel from "../../models/service.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// --------------------- CREATE SERVICE ---------------------
export const createService = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    throw new ApiError(400, "Name is required");
  }

  const service = await ServiceModel.create({
    name,
    createdBy: req.user?._id,
  });

  return res.status(201).json({
    success: true,
    message: "Service created successfully",
    data: service,
  });
});

// --------------------- GET ALL SERVICES ---------------------
export const getServices = asyncHandler(async (req, res) => {
  let { search, status, sort = "desc", page, limit } = req.query;

  page = parseInt(page, 10) || 1;
  limit = parseInt(limit, 10) || 10;
  const skip = (page - 1) * limit;

  const filters = {};

  if (search) {
    filters.$or = [{ name: { $regex: search, $options: "i" } }];
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

  const services = await ServiceModel.find(filters)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await ServiceModel.countDocuments(filters);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: services,
    pagination: buildPagination({ page, limit, total }),
  });
});

// --------------------- GET SINGLE SERVICE ---------------------
export const getServiceById = asyncHandler(async (req, res) => {
  const service = await ServiceModel.findById(req.params.id);

  if (!service) {
    throw new ApiError(404, "Service not found");
  }

  return res.status(200).json({
    success: true,
    data: service,
  });
});

// --------------------- UPDATE SERVICE ---------------------
export const updateService = asyncHandler(async (req, res) => {
  const { name, status } = req.body;

  const service = await ServiceModel.findById(req.params.id);
  if (!service) {
    throw new ApiError(404, "Service not found");
  }

  service.name = name || service.name;
  service.status = typeof status === "boolean" ? status : service.status;
  service.updatedBy = req.user?._id;
  service.updatedAt = new Date();

  await service.save();

  return res.status(200).json({
    success: true,
    message: "Service updated successfully",
    data: service,
  });
});

// --------------------- DELETE SERVICE ---------------------
export const deleteService = asyncHandler(async (req, res) => {
  const service = await ServiceModel.findById(req.params.id);
  if (!service) {
    throw new ApiError(404, "Service not found");
  }

  await service.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Service deleted successfully",
  });
});
