import ShippingChargeModel from "../../models/shippingCharge.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

/* --------------------- CREATE SHIPPING CHARGE --------------------- */
export const createShippingCharge = asyncHandler(async (req, res) => {
  const { state, charge } = req.body;

  if (!state) {
    throw new ApiError(400, "State is required");
  }

  const exists = await ShippingChargeModel.findOne({ state });
  if (exists) {
    throw new ApiError(400, "This state already exists");
  };

  const shippingCharge = await ShippingChargeModel.create({
    state,
    charge: charge || 40,
    createdBy: req.user?._id,
  });

  return res.status(201).json({
    success: true,
    message: "Created successfully",
    data: shippingCharge,
  });
});

/* --------------------- GET ALL SHIPPING CHARGES --------------------- */
export const getShippingCharges = asyncHandler(async (req, res) => {
  let { search, status, sort = "desc", page, limit } = req.query;

  page = parseInt(page, 10) || 1;
  limit = parseInt(limit, 10) || 10;
  const skip = (page - 1) * limit;

  const filters = {};

  if (search) {
    filters.state = { $regex: search, $options: "i" };
  }

  if (status !== undefined) {
    filters.status = status === "true";
  }

  let sortOption = {};
  if (sort === "asc") sortOption = { createdAt: 1 };
  else if (sort === "desc") sortOption = { createdAt: -1 };
  else sortOption = sort;

  const list = await ShippingChargeModel
    .find(filters)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await ShippingChargeModel.countDocuments(filters);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: list,
    pagination: buildPagination({ page, limit, total }),
  });
});

/* --------------------- GET SINGLE SHIPPING CHARGE --------------------- */
export const getShippingChargeById = asyncHandler(async (req, res) => {
  const shippingCharge = await ShippingChargeModel.findById(req.params.id);

  if (!shippingCharge) {
    throw new ApiError(404, "Shipping charge not found");
  }

  return res.status(200).json({
    success: true,
    data: shippingCharge,
  });
});

/* --------------------- UPDATE SHIPPING CHARGE --------------------- */
export const updateShippingCharge = asyncHandler(async (req, res) => {
  const { state, charge, status } = req.body;

  const shippingCharge = await ShippingChargeModel.findById(req.params.id);
  if (!shippingCharge) {
    throw new ApiError(404, "Shipping charge not found");
  }

  if (state && state !== shippingCharge.state) {
    const exists = await ShippingChargeModel.findOne({ state });
    if (exists) {
      throw new ApiError(400, "This state already exists");
    }
  }

  shippingCharge.state = state || shippingCharge.state;
  shippingCharge.charge = charge || shippingCharge.charge;
  shippingCharge.status = typeof status === "boolean" ? status : shippingCharge.status;
  shippingCharge.updatedBy = req.user?._id;
  shippingCharge.updatedAt = new Date();

  await shippingCharge.save();

  return res.status(200).json({
    success: true,
    message: "Updated successfully",
    data: shippingCharge,
  });
});

/* --------------------- DELETE SHIPPING CHARGE --------------------- */
export const deleteShippingCharge = asyncHandler(async (req, res) => {
  const shippingCharge = await ShippingChargeModel.findById(req.params.id);
  if (!shippingCharge) {
    throw new ApiError(404, "Shipping charge not found");
  }

  await shippingCharge.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Deleted successfully",
  });
});
