import CarouselModel from "../../models/carousel.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import compressImage from "../../helpers/compressImage.js";
import fs from "fs";
import path from "path";
import { buildPagination } from "../../utils/pagination.js";

export const createCarousel = asyncHandler(async (req, res) => {
  const { navigateTo } = req.body;

  let bannerPath = null;
  try {
    if (req.files?.banner?.[0]) {
      bannerPath = await compressImage(req.files.banner[0].buffer, "carousel");
    }

    const carousel = await CarouselModel.create({
      banner: bannerPath,
      navigateTo,
      createdBy: req.user?._id,
    });

    return res.status(201).json({ success: true, data: carousel });
  } catch (error) {
    if (bannerPath && fs.existsSync(path.join(process.cwd(), bannerPath))) {
      fs.unlinkSync(path.join(process.cwd(), bannerPath));
    }
    throw new ApiError(500, error.message || "Something went wrong");
  }
});

export const getCarousels = asyncHandler(async (req, res) => {
  let { search, status, sort = "desc", page, limit } = req.query;

  page = parseInt(page, 10) || 1;
  limit = parseInt(limit, 10) || 10;
  const skip = (page - 1) * limit;

  const filters = {};
  if (status === "true" || status === "false") filters.status = status === "true";

  let sortOption = {};
  if (sort === "asc") sortOption = { createdAt: 1 };
  else if (sort === "desc") sortOption = { createdAt: -1 };
  else sortOption = sort;

  const carousels = await CarouselModel.find(filters)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await CarouselModel.countDocuments(filters);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: carousels,
    pagination: buildPagination({ page, limit, total }),
  });
});

export const getCarouselById = asyncHandler(async (req, res) => {
  const carousel = await CarouselModel.findById(req.params.id);
  if (!carousel) throw new ApiError(404, "Carousel not found");

  return res.status(200).json({ success: true, data: carousel });
});

export const updateCarousel = asyncHandler(async (req, res) => {
  const { navigateTo, status } = req.body;

  const carousel = await CarouselModel.findById(req.params.id);
  if (!carousel) throw new ApiError(404, "Carousel not found");

  if (req.files?.banner?.[0]) {
    if (carousel?.banner && fs.existsSync(path.join(process.cwd(), carousel.banner))) {
      fs.unlinkSync(path.join(process.cwd(), carousel.banner));
    }
    carousel.banner = await compressImage(req.files.banner[0].buffer, "carousel");
  }

  carousel.navigateTo = navigateTo || carousel.navigateTo;
  carousel.status = typeof status === "boolean" ? status : carousel.status;
  carousel.updatedBy = req.user?._id;
  carousel.updatedAt = new Date();

  await carousel.save();

  return res.status(200).json({ success: true, message: "Updated Successfully", data: carousel });
});

export const deleteCarousel = asyncHandler(async (req, res) => {
  const carousel = await CarouselModel.findById(req.params.id);
  if (!carousel) throw new ApiError(404, "Carousel not found");

  if (carousel?.banner && fs.existsSync(path.join(process.cwd(), carousel.banner))) {
    fs.unlinkSync(path.join(process.cwd(), carousel.banner));
  }

  await carousel.deleteOne();

  return res.status(200).json({ success: true, message: "Deleted successfully" });
});
