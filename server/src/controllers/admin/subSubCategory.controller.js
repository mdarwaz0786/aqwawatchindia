import SubSubCategoryModel from "../../models/subSubCategory.model.js";
import SubCategoryModel from "../../models/subCategory.model.js";
import CategoryModel from "../../models/category.model.js";
import SlugModel from "../../models/slug.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import compressImage from "../../helpers/compressImage.js";
import { generateUniqueSlug } from "../../helpers/generateUniqueSlug.js";
import fs from "fs";
import path from "path";
import { buildPagination } from "../../utils/pagination.js";

// ---------------- Create SubSubCategory ----------------
export const createSubSubCategory = asyncHandler(async (req, res) => {
  const { name, category, subCategory } = req.body;

  const cat = await CategoryModel.findById(category);
  if (!cat) throw new ApiError(404, "Category not found");

  const subCat = await SubCategoryModel.findById(subCategory);
  if (!subCat) throw new ApiError(404, "SubCategory not found");

  let imagePath = null;
  let iconPath = null;

  try {
    if (req.files?.image?.[0]) {
      imagePath = await compressImage(req.files.image[0].buffer, "subSubCategory");
    }

    if (req.files?.icon?.[0]) {
      iconPath = await compressImage(req.files.icon[0].buffer, "subSubCategory");
    }

    const subSubCategory = await SubSubCategoryModel.create({
      name,
      category,
      subCategory,
      createdBy: req.user?._id,
      image: imagePath,
      icon: iconPath,
    });

    const slug = await generateUniqueSlug(name, "SubSubCategory", subSubCategory?._id, "sub-sub-categories");
    subSubCategory.slug = slug;
    await subSubCategory.save();

    return res.status(201).json({ success: true, message: "Created successfully", data: subSubCategory });
  } catch (error) {
    if (imagePath && fs.existsSync(path.join(process.cwd(), imagePath))) fs.unlinkSync(path.join(process.cwd(), imagePath));
    if (iconPath && fs.existsSync(path.join(process.cwd(), iconPath))) fs.unlinkSync(path.join(process.cwd(), iconPath));
    throw new ApiError(500, error.message || "Something went wrong");
  }
});

// ---------------- Get All SubSubCategories ----------------
export const getSubSubCategories = asyncHandler(async (req, res) => {
  let { search, status, sort = "desc", page, limit, category, subCategory } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;
  const filters = {};

  if (category) filters.category = category;
  if (subCategory) filters.subCategory = subCategory;
  if (search) filters.$or = [{ name: { $regex: search, $options: "i" } }];
  if (status !== undefined) filters.status = status === "true";

  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const subSubCategories = await SubSubCategoryModel
    .find(filters)
    .populate("category")
    .populate("subCategory")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await SubSubCategoryModel.countDocuments(filters);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: subSubCategories,
    pagination: buildPagination({ page, limit, total }),
  });
});

// ---------------- Get Single SubSubCategory ----------------
export const getSubSubCategoryById = asyncHandler(async (req, res) => {
  const subSubCategory = await SubSubCategoryModel
    .findById(req.params.id)
    .populate("category")
    .populate("subCategory")
    .lean();

  if (!subSubCategory) throw new ApiError(404, "SubSubCategory not found");

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: subSubCategory });
});

// ---------------- Update SubSubCategory ----------------
export const updateSubSubCategory = asyncHandler(async (req, res) => {
  const { name, status, category, subCategory } = req.body;

  const subSubCategory = await SubSubCategoryModel.findById(req.params.id);
  if (!subSubCategory) throw new ApiError(404, "SubSubCategory not found");

  if (req.files?.image?.[0]) {
    if (subSubCategory?.image && fs.existsSync(path.join(process.cwd(), subSubCategory.image))) {
      fs.unlinkSync(path.join(process.cwd(), subSubCategory.image));
    }
    subSubCategory.image = await compressImage(req.files.image[0].buffer, "subSubCategory");
  }

  if (req.files?.icon?.[0]) {
    if (subSubCategory?.icon && fs.existsSync(path.join(process.cwd(), subSubCategory.icon))) {
      fs.unlinkSync(path.join(process.cwd(), subSubCategory.icon));
    }
    subSubCategory.icon = await compressImage(req.files.icon[0].buffer, "subSubCategory");
  }

  if (name && name !== subSubCategory.name) {
    await SlugModel.deleteOne({ collectionName: "SubSubCategory", documentId: subSubCategory._id });
    const newSlug = await generateUniqueSlug(name, "SubSubCategory", subSubCategory._id, "sub-sub-categories");
    subSubCategory.slug = newSlug;
  }

  subSubCategory.name = name || subSubCategory.name;
  subSubCategory.status = typeof status === "boolean" ? status : subSubCategory.status;
  subSubCategory.category = category || subSubCategory.category;
  subSubCategory.subCategory = subCategory || subSubCategory.subCategory;
  subSubCategory.updatedBy = req.user?._id;
  subSubCategory.updatedAt = new Date();

  await subSubCategory.save();
  return res.status(200).json({ success: true, message: "Updated successfully", data: subSubCategory });
});

// ---------------- Delete SubSubCategory ----------------
export const deleteSubSubCategory = asyncHandler(async (req, res) => {
  const subSubCategory = await SubSubCategoryModel.findById(req.params.id);
  if (!subSubCategory) throw new ApiError(404, "SubSubCategory not found");

  if (subSubCategory.image && fs.existsSync(path.join(process.cwd(), subSubCategory.image))) {
    fs.unlinkSync(path.join(process.cwd(), subSubCategory.image));
  }

  if (subSubCategory.icon && fs.existsSync(path.join(process.cwd(), subSubCategory.icon))) {
    fs.unlinkSync(path.join(process.cwd(), subSubCategory.icon));
  }

  await SlugModel.deleteOne({ collectionName: "SubSubCategory", documentId: subSubCategory._id });
  await subSubCategory.deleteOne();

  return res.status(200).json({ success: true, message: "Deleted successfully" });
});
