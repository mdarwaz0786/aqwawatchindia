import ProductModel from "../../models/product.model.js";
import CategoryModel from "../../models/category.model.js";
import SubCategoryModel from "../../models/subCategory.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";
import mongoose from "mongoose";

// get all products
export const getProducts = asyncHandler(async (req, res) => {
  let {
    search,
    slug,
    category,
    subCategory,
    brand,
    bestSellingProduct,
    newArrivalProduct,
    sort = "desc",
    minPrice,
    maxPrice,
    page = 1,
    limit = 10,
  } = req.query;

  page = parseInt(page, 10) || 1;
  limit = parseInt(limit, 10) || 10;
  const skip = (page - 1) * limit;

  const filters = {};

  if (search) {
    filters.$or = [
      { name: { $regex: search, $options: "i" } },
      { skuCode: { $regex: search, $options: "i" } },
    ];
  }

  if (slug) filters.slug = slug;

  if (category) {
    if (mongoose.Types.ObjectId.isValid(category)) {
      filters.category = category;
    } else {
      const cat = await CategoryModel.findOne({ slug: category }).select("_id");
      if (cat) filters.category = cat?._id;
    }
  }

  if (subCategory) {
    if (mongoose.Types.ObjectId.isValid(subCategory)) {
      filters.subCategory = subCategory;
    } else {
      const subCat = await SubCategoryModel.findOne({ slug: subCategory }).select("_id");
      if (subCat) filters.subCategory = subCat?._id;
    }
  }

  if (brand) filters.brand = brand;
  if (bestSellingProduct) filters.bestSellingProduct = bestSellingProduct === "true" || bestSellingProduct === true;
  if (newArrivalProduct) filters.newArrivalProduct = newArrivalProduct === "true" || newArrivalProduct === true;
  filters.status = true;

  if (minPrice || maxPrice) {
    filters.salePrice = {};
    if (minPrice) filters.salePrice.$gte = parseFloat(minPrice);
    if (maxPrice) filters.salePrice.$lte = parseFloat(maxPrice);
  }

  let sortOption = {};

  switch (sort) {
    case "price_asc":
      sortOption = { salePrice: 1 };
      break;
    case "price_desc":
      sortOption = { salePrice: -1 };
      break;
    case "oldest":
      sortOption = { createdAt: 1 };
      break;
    default:
      sortOption = { createdAt: -1 };
      break;
  }

  const [products, total] = await Promise.all([
    ProductModel.find(filters)
      .populate("category", "name slug")
      .populate("subCategory", "name slug")
      .populate("brand", "name slug")
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean(),
    ProductModel.countDocuments(filters),
  ]);

  res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: products,
    pagination: buildPagination({ page, limit, total }),
  });
});

// get single product by id or slug
export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let product;

  if (mongoose.Types.ObjectId.isValid(id)) {
    product = await ProductModel.findById(id)
      .populate("category", "name slug")
      .populate("subCategory", "name slug")
      .populate("brand", "name slug")
      .lean();
  } else {
    product = await ProductModel.findOne({ slug: id })
      .populate("category", "name slug")
      .populate("subCategory", "name slug")
      .populate("brand", "name slug")
      .lean();
  }

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: product,
  });
});

