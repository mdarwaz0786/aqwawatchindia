import ProductModel from "../../models/product.model.js";
import SlugModel from "../../models/slug.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import compressImage from "../../helpers/compressImage.js";
import { generateUniqueSlug } from "../../helpers/generateUniqueSlug.js";
import fs from "fs";
import path from "path";
import { buildPagination } from "../../utils/pagination.js";

// create product
export const createProduct = asyncHandler(async (req, res) => {
  const {
    category,
    subCategory,
    brand,
    name,
    skuCode,
    mrpPrice,
    salePrice,
    rating,
    numberOfReviews,
    smallInfo,
    description,
    specification,
    amazonLink,
    flipKartLink,
    youtubeVideoLink,
    bestSellingProduct,
    newArrivalProduct,
    stock,
  } = req.body;

  let imagePaths = [];

  try {
    if (req.files?.images?.length) {
      const compressed = await Promise.all(req.files.images.map((file) => compressImage(file.buffer, "product")));
      imagePaths = compressed;
    } else {
      throw new ApiError(400, "At least one image is required");
    };

    const product = await ProductModel.create({
      category,
      subCategory: subCategory || null,
      brand: brand || null,
      name,
      skuCode,
      mrpPrice,
      salePrice,
      rating,
      numberOfReviews,
      smallInfo,
      description,
      specification,
      amazonLink,
      flipKartLink,
      youtubeVideoLink,
      bestSellingProduct: bestSellingProduct || false,
      newArrivalProduct: newArrivalProduct || false,
      stock: stock || 0,
      createdBy: req.user?._id,
      images: imagePaths,
    });

    const slug = await generateUniqueSlug(name, "Product", product?._id, "products");
    product.slug = slug;
    await product.save();

    return res.status(201).json({
      success: true,
      message: "Created successfully",
      data: product,
    });
  } catch (error) {
    for (const img of imagePaths) {
      if (img && fs.existsSync(path.resolve(img))) {
        fs.unlinkSync(path.resolve(img));
      };
    };
    throw new ApiError(500, error.message || "Something went wrong while creating product");
  };
});

// get all products
export const getProducts = asyncHandler(async (req, res) => {
  let {
    search,
    category,
    brand,
    status,
    sort = "desc",
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

  if (category) filters.category = category;
  if (brand) filters.brand = brand;
  if (status !== undefined) filters.status = status === "true" || status === true;

  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

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

// get single product
export const getProductById = asyncHandler(async (req, res) => {
  const product = await ProductModel.findById(req.params.id)
    .populate("category", "name slug")
    .populate("subCategory", "name slug")
    .populate("brand", "name slug");

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: product,
  });
});

// update product
export const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    category,
    subCategory,
    brand,
    skuCode,
    mrpPrice,
    salePrice,
    rating,
    numberOfReviews,
    smallInfo,
    description,
    specification,
    amazonLink,
    flipKartLink,
    youtubeVideoLink,
    bestSellingProduct,
    newArrivalProduct,
    stock,
    status,
  } = req.body;

  const product = await ProductModel.findById(req.params.id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  const removedIndexes = req.body.removedIndexes
    ? JSON.parse(req.body.removedIndexes)
    : [];

  console.log(removedIndexes)

  let updatedImages = [];

  for (let i = 0; i < product.images.length; i++) {
    if (removedIndexes.includes(i)) {
      const filePath = path.resolve(product.images[i]);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    } else {
      updatedImages.push(product.images[i]);
    }
  }

  if (req.files?.images?.length) {
    const newUploads = await Promise.all(
      req.files.images.map(file =>
        compressImage(file.buffer, "product")
      )
    );
    updatedImages.push(...newUploads);
  }

  product.images = updatedImages;

  if (name && name !== product.name) {
    await SlugModel.deleteOne({
      collectionName: "Product",
      documentId: product._id,
    });
    const newSlug = await generateUniqueSlug(name, "Product", product?._id, "products");
    product.slug = newSlug;
  };

  const setValue = (newVal, oldVal) => (newVal !== undefined ? newVal : oldVal);

  product.name = setValue(name, product.name);
  product.category = setValue(category, product.category);
  product.subCategory = setValue(subCategory, product.subCategory);
  product.brand = setValue(brand, product.brand);
  product.skuCode = setValue(skuCode, product.skuCode);
  product.mrpPrice = setValue(mrpPrice, product.mrpPrice);
  product.salePrice = setValue(salePrice, product.salePrice);
  product.rating = setValue(rating, product.rating);
  product.numberOfReviews = setValue(numberOfReviews, product.numberOfReviews);
  product.smallInfo = setValue(smallInfo, product.smallInfo);
  product.description = setValue(description, product.description);
  product.specification = setValue(specification, product.specification);
  product.amazonLink = setValue(amazonLink, product.amazonLink);
  product.flipKartLink = setValue(flipKartLink, product.flipKartLink);
  product.youtubeVideoLink = setValue(youtubeVideoLink, product.youtubeVideoLink);
  product.stock = setValue(stock, product.stock);

  if (bestSellingProduct !== undefined) {
    product.bestSellingProduct = bestSellingProduct === "true";
  };
  if (newArrivalProduct !== undefined) {
    product.newArrivalProduct = newArrivalProduct === "true";
  };
  product.status = typeof status === "boolean" ? status : product.status;
  product.updatedBy = req.user?._id;
  product.updatedAt = new Date();

  await product.save();

  res.status(200).json({
    success: true,
    message: "Updated successfully",
    data: product,
  });
});

// delete product
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await ProductModel.findById(req.params.id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  if (product.images?.length) {
    for (const img of product.images) {
      if (fs.existsSync(path.resolve(img))) {
        fs.unlinkSync(path.resolve(img));
      }
    }
  }

  await SlugModel.deleteOne({
    collectionName: "Product",
    documentId: product._id,
  });

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Deleted successfully",
  });
});
