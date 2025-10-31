import ProductModel from "../../models/product.model.js";
import ProductVariantModel from "../../models/productVariant.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import compressImage from "../../helpers/compressImage.js";
import { generateUniqueSlug } from "../../helpers/generateUniqueSlug.js";
import fs from "fs";
import path from "path";
import { buildPagination } from "../../utils/pagination.js";

// CREATE PRODUCT
export const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    category,
    subCategory,
    subSubCategory,
    brand,
    skuCode,
    thumbMrpPrice,
    thumbSalePrice,
    thumbStock,
    smallInfo,
    description,
    specification,
    featuredProduct,
    bestSellingProduct,
    specialProduct,
    newArrivalProduct,
    topRatedProduct,
    dealsOfDayProduct,
    trendingProduct,
    ourBestProduct,
    variants,
  } = req.body;

  if (!name || !category || !smallInfo || !thumbMrpPrice || !thumbSalePrice) {
    throw new ApiError(400, "Required fields missing");
  }

  let thumbImagePath = null;
  let createdVariants = [];

  try {
    if (req.files?.thumbImage?.[0]) {
      thumbImagePath = await compressImage(req.files.thumbImage[0].buffer, "products");
    } else {
      throw new ApiError(400, "Thumb image is required");
    };

    const product = await ProductModel.create({
      name,
      category,
      subCategory,
      subSubCategory,
      brand,
      skuCode,
      thumbImage: thumbImagePath,
      thumbMrpPrice,
      thumbSalePrice,
      thumbStock,
      smallInfo,
      description,
      specification,
      featuredProduct,
      bestSellingProduct,
      specialProduct,
      newArrivalProduct,
      topRatedProduct,
      dealsOfDayProduct,
      trendingProduct,
      ourBestProduct,
      createdBy: req.user?._id,
    });

    const slug = await generateUniqueSlug(name, "Product", product?._id, "products");
    product.slug = slug;
    await product.save();

    // Handle Variants
    // Expected: variants = JSON stringified array with color, size, mrpPrice, salePrice, stock, skuCode
    const parsedVariants = variants ? JSON.parse(variants) : [];

    for (const variant of parsedVariants) {
      const variantImages = req.files?.[`variantImages_${variant.tempId}`];
      // tempId is unique key from frontend (ex: random string to map images to variant)
      if (variantImages && variantImages.length > 0) {
        for (const file of variantImages) {
          const imagePath = await compressImage(file.buffer, "variants");
          const newVariant = await ProductVariantModel.create({
            product: product._id,
            color: variant.color || null,
            size: variant.size || null,
            skuCode: skuCode || "",
            mrpPrice: variant.mrpPrice || 0,
            salePrice: variant.salePrice || 0,
            stock: variant.stock || 0,
            image: imagePath,
          });
          createdVariants.push(newVariant);
        }
      }
    }

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: { product, variants: createdVariants },
    });
  } catch (error) {
    // Cleanup on error
    if (thumbImagePath && fs.existsSync(path.join(process.cwd(), thumbImagePath))) {
      fs.unlinkSync(path.join(process.cwd(), thumbImagePath));
    }

    for (const v of createdVariants) {
      if (v.image && fs.existsSync(path.join(process.cwd(), v.image))) {
        fs.unlinkSync(path.join(process.cwd(), v.image));
      }
    }

    throw new ApiError(500, error.message || "Failed to create product");
  }
});

//  GET ALL PRODUCTS
export const getAllProducts = asyncHandler(async (req, res) => {
  let { search, status, sort = "desc", page, limit } = req.query;

  page = parseInt(page, 10) || 1;
  limit = parseInt(limit, 10) || 10;
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) {
    filters.$text = { $search: search };
  }

  if (status !== undefined) {
    filters.status = status === "true";
  }

  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const products = await ProductModel
    .find(filters)
    .populate("category subCategory subSubCategory brand")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await ProductModel.countDocuments(filters);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: products,
    pagination: buildPagination({ page, limit, total }),
  });
});

// GET SINGLE PRODUCT
export const getProductById = asyncHandler(async (req, res) => {
  const product = await ProductModel.findById(req.params.id)
    .populate("category subCategory subSubCategory brand")
    .lean();

  if (!product) throw new ApiError(404, "Product not found");

  const variants = await ProductVariantModel.find({ product: product._id })
    .populate("color size")
    .lean();

  return res.status(200).json({
    success: true,
    data: { product, variants },
  });
});

// UPDATE PRODUCT
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await ProductModel.findById(req.params.id);
  if (!product) throw new ApiError(404, "Product not found");

  const {
    name,
    thumbMrpPrice,
    thumbSalePrice,
    thumbStock,
    smallInfo,
    description,
    specification,
    status,
    variants,          // JSON string of variants
    deletedVariantIds, // Array of variant IDs to delete
  } = req.body;

  try {
    // ===================== 🖼️ THUMB IMAGE =====================
    if (req.files?.thumbImage?.[0]) {
      if (product.thumbImage && fs.existsSync(path.join(process.cwd(), product.thumbImage))) {
        fs.unlinkSync(path.join(process.cwd(), product.thumbImage));
      }
      product.thumbImage = await compressImage(req.files.thumbImage[0].buffer, "products");
    }

    // ===================== 🧾 BASIC FIELDS =====================
    if (name && name !== product.name) {
      const slug = await generateUniqueSlug(name, "Product", product._id, "products");
      product.slug = slug;
    }

    product.name = name || product.name;
    product.thumbMrpPrice = thumbMrpPrice || product.thumbMrpPrice;
    product.thumbSalePrice = thumbSalePrice || product.thumbSalePrice;
    product.thumbStock = thumbStock || product.thumbStock;
    product.smallInfo = smallInfo || product.smallInfo;
    product.description = description || product.description;
    product.specification = specification || product.specification;
    product.status = typeof status === "boolean" ? status : product.status;
    product.updatedBy = req.user?._id;

    await product.save();

    // ===================== 🗑️ DELETE VARIANTS =====================
    if (deletedVariantIds) {
      const parsedDeletes = JSON.parse(deletedVariantIds);
      for (const variantId of parsedDeletes) {
        const variant = await ProductVariantModel.findById(variantId);
        if (variant) {
          if (variant.image && fs.existsSync(path.join(process.cwd(), variant.image))) {
            fs.unlinkSync(path.join(process.cwd(), variant.image));
          }
          await variant.deleteOne();
        }
      }
    }

    // ===================== 🧩 ADD/UPDATE VARIANTS =====================
    if (variants) {
      const parsedVariants = JSON.parse(variants);

      for (const variant of parsedVariants) {
        // CASE 1: existing variant (update)
        if (variant._id) {
          const existing = await ProductVariantModel.findById(variant._id);
          if (!existing) continue;

          if (req.files?.[`variantImages_${variant.tempId}`]?.[0]) {
            // Replace old image if exists
            if (existing.image && fs.existsSync(path.join(process.cwd(), existing.image))) {
              fs.unlinkSync(path.join(process.cwd(), existing.image));
            }
            existing.image = await compressImage(
              req.files[`variantImages_${variant.tempId}`][0].buffer,
              "variants"
            );
          }

          existing.color = variant.color || existing.color;
          existing.size = variant.size || existing.size;
          existing.mrpPrice = variant.mrpPrice || existing.mrpPrice;
          existing.salePrice = variant.salePrice || existing.salePrice;
          existing.stock = variant.stock || existing.stock;
          existing.skuCode = variant.skuCode || existing.skuCode;
          await existing.save();
        }

        // CASE 2: new variant (create)
        else {
          const variantImages = req.files?.[`variantImages_${variant.tempId}`];
          if (variantImages && variantImages.length > 0) {
            for (const file of variantImages) {
              const imagePath = await compressImage(file.buffer, "variants");
              await ProductVariantModel.create({
                product: product._id,
                color: variant.color || null,
                size: variant.size || null,
                skuCode: variant.skuCode || "",
                mrpPrice: variant.mrpPrice || 0,
                salePrice: variant.salePrice || 0,
                stock: variant.stock || 0,
                image: imagePath,
              });
            }
          }
        }
      }
    }

    // ===================== ✅ RESPONSE =====================
    return res.status(200).json({
      success: true,
      message: "Product & variants updated successfully",
    });

  } catch (error) {
    throw new ApiError(500, error.message || "Failed to update product");
  }
});

// DELETE PRODUCT
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await ProductModel.findById(req.params.id);
  if (!product) throw new ApiError(404, "Product not found");

  const variants = await ProductVariantModel.find({ product: product._id });

  if (product.thumbImage && fs.existsSync(path.join(process.cwd(), product.thumbImage))) {
    fs.unlinkSync(path.join(process.cwd(), product.thumbImage));
  }

  for (const v of variants) {
    if (v.image && fs.existsSync(path.join(process.cwd(), v.image))) {
      fs.unlinkSync(path.join(process.cwd(), v.image));
    }
  }

  await ProductVariantModel.deleteMany({ product: product._id });
  await product.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Deleted successfully",
  });
});
