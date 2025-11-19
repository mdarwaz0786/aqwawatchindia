import PromotionModel from "../../models/promotion.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import compressImage from "../../helpers/compressImage.js";
import fs from "fs";
import path from "path";
import { buildPagination } from "../../utils/pagination.js";

export const createPromotion = asyncHandler(async (req, res) => {
  const { category, products, position } = req.body;

  let bannerPath = null;
  try {
    if (req.files?.banner?.[0]) {
      bannerPath = await compressImage(req.files.banner[0].buffer, "promotion");
    }

    const promotion = await PromotionModel.create({
      banner: bannerPath,
      category,
      products,
      position,
      createdBy: req.user?._id,
    });

    return res.status(201).json({ success: true, data: promotion });
  } catch (error) {
    if (bannerPath && fs.existsSync(path.join(process.cwd(), bannerPath))) {
      fs.unlinkSync(path.join(process.cwd(), bannerPath));
    }
    throw new ApiError(500, error.message || "Something went wrong");
  }
});

export const getPromotions = asyncHandler(async (req, res) => {
  let { category, status, sort = "desc", page, limit } = req.query;

  page = parseInt(page, 10) || 1;
  limit = parseInt(limit, 10) || 10;
  const skip = (page - 1) * limit;

  const filters = {};
  if (category) filters.category = category;
  if (status === "true" || status === "false") filters.status = status === "true";

  let sortOption = {};
  if (sort === "asc") sortOption = { createdAt: 1 };
  else if (sort === "desc") sortOption = { createdAt: -1 };
  else sortOption = sort;

  const promotions = await PromotionModel.find(filters)
    .populate({ path: "category", strictPopulate: false })
    .populate({ path: "products", strictPopulate: false })
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await PromotionModel.countDocuments(filters);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: promotions,
    pagination: buildPagination({ page, limit, total }),
  });
});

export const getPromotionById = asyncHandler(async (req, res) => {
  const promotion = await PromotionModel.findById(req.params.id)
    .populate({ path: "category", strictPopulate: false })
    .populate({ path: "products", strictPopulate: false });

  if (!promotion) throw new ApiError(404, "Promotion not found");

  return res.status(200).json({ success: true, data: promotion });
});

export const updatePromotion = asyncHandler(async (req, res) => {
  const { category, products, position, status } = req.body;

  const promotion = await PromotionModel.findById(req.params.id);
  if (!promotion) throw new ApiError(404, "Promotion not found");

  if (req.files?.banner?.[0]) {
    if (promotion?.banner && fs.existsSync(path.join(process.cwd(), promotion.banner))) {
      fs.unlinkSync(path.join(process.cwd(), promotion.banner));
    }
    promotion.banner = await compressImage(req.files.banner[0].buffer, "promotion");
  }

  promotion.category = category || promotion.category;
  promotion.products = products || promotion.products;
  promotion.position = position || promotion.position;
  promotion.status = typeof status === "boolean" ? status : promotion.status;
  promotion.updatedBy = req.user?._id;
  promotion.updatedAt = new Date();

  await promotion.save();

  return res.status(200).json({ success: true, message: "Updated Successfully", data: promotion });
});

export const deletePromotion = asyncHandler(async (req, res) => {
  const promotion = await PromotionModel.findById(req.params.id);
  if (!promotion) throw new ApiError(404, "Promotion not found");

  if (promotion?.banner && fs.existsSync(path.join(process.cwd(), promotion.banner))) {
    fs.unlinkSync(path.join(process.cwd(), promotion.banner));
  }

  await promotion.deleteOne();

  return res.status(200).json({ success: true, message: "Deleted successfully" });
});
