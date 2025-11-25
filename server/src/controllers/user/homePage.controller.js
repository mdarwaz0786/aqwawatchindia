import asyncHandler from "../../helpers/asyncHandler.js";
import CategoryModel from "../../models/category.model.js";
import SubCategoryModel from "../../models/subCategory.model.js";
import ProductModel from "../../models/product.model.js";

// Get home page data
export const getHomePageData = asyncHandler(async (req, res) => {

  let categories = await CategoryModel
    .find({ status: true })
    .populate({
      path: "subcategories",
      match: { status: true },
      options: { sort: { createdAt: 1 } },
      strictPopulate: false,
    })
    .sort({ createdAt: 1 })
    .lean();

  categories = categories.map((cat) => {
    const subCategoryCount = cat.subcategories?.length || 0;

    return {
      ...cat,
      subCategoryCount,
    };
  });

  let subCategories = await SubCategoryModel
    .find({ status: true })
    .sort({ createdAt: 1 })
    .lean();

  const bestSellingProducts = await ProductModel.find(
    { status: true, bestSellingProduct: true },
    { name: 1, slug: 1, mrpPrice: 1, salePrice: 1, images: 1, rating: 1, numberOfReviews: 1, percentOff: 1, bestSellingProduct: 1, newArrivalProduct: 1 }
  ).sort({ createdAt: 1 }).lean();

  const newArrivalProducts = await ProductModel.find(
    { status: true, newArrivalProduct: true },
    { name: 1, slug: 1, mrpPrice: 1, salePrice: 1, images: 1, rating: 1, numberOfReviews: 1, percentOff: 1, bestSellingProduct: 1, newArrivalProduct: 1 }
  ).sort({ createdAt: 1 }).lean();

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: {
      category: categories,
      subCategory: subCategories,
      bestSellingProduct: bestSellingProducts,
      newArrivalProduct: newArrivalProducts,
    },
  });
});
