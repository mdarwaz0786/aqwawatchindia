import Address from "../../models/address.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// Create Address
export const createAddress = asyncHandler(async (req, res) => {
  const { label, country, state, city, zip, address, instruction } = req.body;

  if (!country) {
    throw new ApiError(400, "Country is required");
  }

  if (!state) {
    throw new ApiError(400, "State is required");
  }

  if (!city) {
    throw new ApiError(400, "City is required");
  }

  if (!zip) {
    throw new ApiError(400, "ZIP code is required");
  }

  if (!address) {
    throw new ApiError(400, "Address is required");
  }

  const newAddress = await Address.create({
    user: req.user?._id,
    label: label || "Home",
    country,
    state,
    city,
    zip,
    address,
    instruction: instruction || "",
  });

  return res.status(201).json({ success: true, data: newAddress });
});

// Get All Addresses (optionally by user)
export const getAddresses = asyncHandler(async (req, res) => {
  let { search, page = 1, limit = 10, sort = "desc" } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  filters.user = req.user?._id;

  if (search) {
    filters.$or = [
      { country: { $regex: search, $options: "i" } },
      { state: { $regex: search, $options: "i" } },
      { city: { $regex: search, $options: "i" } },
      { address: { $regex: search, $options: "i" } },
    ];
  }

  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const addresses = await Address.find(filters)
    .populate("user", "-password")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await Address.countDocuments(filters);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: addresses,
    pagination: buildPagination({ page, limit, total }),
  });
});

// Get Single Address
export const getAddressById = asyncHandler(async (req, res) => {
  const address = await Address.findById(req.params.id).populate("user", "-password");

  if (!address) {
    throw new ApiError(404, "Address not found");
  }

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: address });
});

// Update Address
export const updateAddress = asyncHandler(async (req, res) => {
  const { label, country, state, city, zip, address, instruction } = req.body;

  const existingAddress = await Address.findById(req.params.id);

  if (!existingAddress) {
    throw new ApiError(404, "Address not found");
  }

  existingAddress.label = label || existingAddress.label;
  existingAddress.country = country || existingAddress.country;
  existingAddress.state = state || existingAddress.state;
  existingAddress.city = city || existingAddress.city;
  existingAddress.zip = zip || existingAddress.zip;
  existingAddress.address = address || existingAddress.address;
  existingAddress.instruction = instruction || existingAddress.instruction;
  existingAddress.updatedAt = new Date();

  await existingAddress.save();

  return res.status(200).json({ success: true, message: "Updated successfully", data: existingAddress });
});

// Delete Address
export const deleteAddress = asyncHandler(async (req, res) => {
  const address = await Address.findById(req.params.id);
  if (!address) {
    throw new ApiError(404, "Address not found");
  }

  await address.deleteOne();

  return res.status(200).json({ success: true, message: "Deleted successfully" });
});
