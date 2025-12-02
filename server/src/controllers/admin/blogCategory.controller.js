import BlogCategoryModel from "../../models/blogCategory.model.js";
import SlugModel from "../../models/slug.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import compressImage from "../../helpers/compressImage.js";
import { generateUniqueSlug } from "../../helpers/generateUniqueSlug.js";
import fs from "fs";
import path from "path";
import { buildPagination } from "../../utils/pagination.js";

export const createBlogCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) throw new ApiError(400, "Name is required");

  let imagePath = null;
  try {
    if (req.files?.image?.[0]) {
      imagePath = await compressImage(req.files.image[0].buffer, "blogCategory");
    }

    const category = await BlogCategoryModel.create({
      name,
      image: imagePath,
      createdBy: req.user?._id,
    });

    const slug = await generateUniqueSlug(name, "BlogCategory", category?._id, "blogCategories");
    category.slug = slug;
    await category.save();

    return res.status(201).json({ success: true, data: category });
  } catch (error) {
    if (imagePath && fs.existsSync(path.join(process.cwd(), imagePath))) {
      fs.unlinkSync(path.join(process.cwd(), imagePath));
    }
    throw new ApiError(500, error.message || "Something went wrong");
  }
});

export const getBlogCategories = asyncHandler(async (req, res) => {
  let { search, status, sort = "desc", page, limit } = req.query;

  page = parseInt(page, 10) || 1;
  limit = parseInt(limit, 10) || 10;
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) filters.$or = [{ name: { $regex: search, $options: "i" } }];
  if (status === "true" || status === "false") filters.status = status === "true";

  let sortOption = {};
  if (sort === "asc") sortOption = { createdAt: 1 };
  else if (sort === "desc") sortOption = { createdAt: -1 };
  else sortOption = sort;

  const categories = await BlogCategoryModel.find(filters)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await BlogCategoryModel.countDocuments(filters);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: categories,
    pagination: buildPagination({ page, limit, total }),
  });
});

export const getBlogCategoryById = asyncHandler(async (req, res) => {
  const category = await BlogCategoryModel.findById(req.params.id);
  if (!category) throw new ApiError(404, "Category not found");

  return res.status(200).json({ success: true, data: category });
});

export const updateBlogCategory = asyncHandler(async (req, res) => {
  const { name, status, removeImage } = req.body;

  const category = await BlogCategoryModel.findById(req.params.id);
  if (!category) throw new ApiError(404, "Category not found");

  if (removeImage === "true") {
    if (category.image && fs.existsSync(path.join(process.cwd(), category.image))) {
      fs.unlinkSync(path.join(process.cwd(), category.image));
    }
    category.image = null;
  }

  if (req.files?.image?.[0]) {
    if (category?.image && fs.existsSync(path.join(process.cwd(), category.image))) {
      fs.unlinkSync(path.join(process.cwd(), category.image));
    }
    category.image = await compressImage(req.files.image[0].buffer, "blogCategory");
  }

  if (name && name !== category?.name) {
    await SlugModel.deleteOne({ collectionName: "BlogCategory", documentId: category?._id });
    const newSlug = await generateUniqueSlug(name, "BlogCategory", category?._id, "blogCategories");
    category.slug = newSlug;
  }

  category.name = name || category.name;
  category.status = typeof status === "boolean" ? status : category.status;
  category.updatedBy = req.user?._id;
  category.updatedAt = new Date();

  await category.save();

  return res.status(200).json({ success: true, message: "Updated Successfully", data: category });
});

export const deleteBlogCategory = asyncHandler(async (req, res) => {
  const category = await BlogCategoryModel.findById(req.params.id);
  if (!category) throw new ApiError(404, "Category not found");

  if (category?.image && fs.existsSync(path.join(process.cwd(), category.image))) {
    fs.unlinkSync(path.join(process.cwd(), category.image));
  }

  await SlugModel.deleteOne({ collectionName: "BlogCategory", documentId: category?._id });
  await category.deleteOne();

  return res.status(200).json({ success: true, message: "Deleted successfully" });
});
