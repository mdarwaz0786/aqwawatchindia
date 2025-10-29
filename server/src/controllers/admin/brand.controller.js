import BrandModel from "../../models/brand.model.js";
import SlugModel from "../../models/slug.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import compressImage from "../../helpers/compressImage.js";
import { generateUniqueSlug } from "../../helpers/generateUniqueSlug.js";
import fs from "fs";
import path from "path";
import { buildPagination } from "../../utils/pagination.js";

// --------------------- CREATE BRAND ---------------------
export const createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    throw new ApiError(400, "Name is required");
  };

  let logoPath = null;

  try {
    if (req.files?.logo?.[0]) {
      logoPath = await compressImage(req.files.logo[0].buffer, "brand");
    };

    const brand = await BrandModel.create({
      name,
      logo: logoPath,
      createdBy: req.user?._id,
    });

    const slug = await generateUniqueSlug(name, "Brand", brand?._id, "brands");
    brand.slug = slug;
    await brand.save();

    return res.status(201).json({ success: true, data: brand });
  } catch (error) {
    if (logoPath && fs.existsSync(path.join(process.cwd(), logoPath))) {
      fs.unlinkSync(path.join(process.cwd(), logoPath));
    };
    throw new ApiError(500, error.message || "Something went wrong");
  };
});

// --------------------- GET ALL BRANDS ---------------------
export const getBrands = asyncHandler(async (req, res) => {
  let { search, status, sort = "desc", page, limit } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) {
    filters.$or = [
      { name: { $regex: search, $options: "i" } },
    ];
  };

  if (status !== undefined) {
    filters.status = status === "true";
  };

  let sortOption = {};
  if (sort === "asc") {
    sortOption = { createdAt: 1 };
  } else if (sort === "desc") {
    sortOption = { createdAt: -1 };
  } else {
    sortOption = sort;
  };

  const brands = await BrandModel.find(filters)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await BrandModel.countDocuments(filters);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: brands,
    pagination: buildPagination({ page, limit, total }),
  });
});

// --------------------- GET SINGLE BRAND ---------------------
export const getBrandById = asyncHandler(async (req, res) => {
  const brand = await BrandModel.findById(req.params.id);

  if (!brand) {
    throw new ApiError(404, "Brand not found");
  };

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: brand });
});

// --------------------- UPDATE BRAND ---------------------
export const updateBrand = asyncHandler(async (req, res) => {
  const { name, status } = req.body;

  const brand = await BrandModel.findById(req.params.id);
  if (!brand) {
    throw new ApiError(404, "Brand not found");
  };

  if (req.files?.logo?.[0]) {
    if (brand?.logo && fs.existsSync(path.join(process.cwd(), brand?.logo))) {
      fs.unlinkSync(path.join(process.cwd(), brand?.logo));
    };
    brand.logo = await compressImage(req.files.logo[0].buffer, "brand");
  };

  if (name && name !== brand?.name) {
    await SlugModel.deleteOne({
      collectionName: "Brand",
      documentId: brand?._id,
    });

    const newSlug = await generateUniqueSlug(name, "Brand", brand?._id, "brands");
    brand.slug = newSlug;
  };

  brand.name = name || brand?.name;
  brand.status = typeof status === "boolean" ? status : brand?.status;
  brand.updatedBy = req.user?._id;
  brand.updatedAt = new Date();

  await brand.save();

  return res.status(200).json({
    success: true,
    message: "Updated successfully",
    data: brand,
  });
});

// --------------------- DELETE BRAND ---------------------
export const deleteBrand = asyncHandler(async (req, res) => {
  const brand = await BrandModel.findById(req.params.id);
  if (!brand) {
    throw new ApiError(404, "Brand not found");
  };

  if (brand?.logo && fs.existsSync(path.join(process.cwd(), brand?.logo))) {
    fs.unlinkSync(path.join(process.cwd(), brand?.logo));
  };

  await SlugModel.deleteOne({
    collectionName: "Brand",
    documentId: brand?._id,
  });

  await brand.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Deleted successfully",
  });
});
