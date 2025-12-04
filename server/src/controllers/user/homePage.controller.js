import asyncHandler from "../../helpers/asyncHandler.js";
import CategoryModel from "../../models/category.model.js";
import SubCategoryModel from "../../models/subCategory.model.js";
import ProductModel from "../../models/product.model.js";
import BlogModel from "../../models/blog.model.js";
import ClientModel from "../../models/client.model.js";
import TestimonialModel from "../../models/testimonial.model.js";
import PromotionModel from "../../models/promotion.model.js";
import CarouselModel from "../../models/carousel.model.js";
import YouTubeModelModel from "../../models/youTubeVideo.model.js";
import CartModel from "../../models/cart.model.js";

// Get home page data
export const getHomePageData = asyncHandler(async (req, res) => {
  const { userId } = req.query;

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

  let cartItems;

  if (userId) {
    const cart = await CartModel.find({ user: userId }).lean();
    cartItems = cart;
  };

  const updatedBestSellingProducts = bestSellingProducts?.map((p) => {
    const found = cartItems?.find((c) => c?.product?.toString() === p?._id?.toString());

    return {
      ...p,
      quantity: found ? found?.quantity : 0,
    };
  });

  const updatedNewArrivalProducts = newArrivalProducts?.map((p) => {
    const found = cartItems?.find((c) => c?.product?.toString() === p?._id?.toString());

    return {
      ...p,
      quantity: found ? found?.quantity : 0,
    };
  });

  const blogs = await BlogModel.find(
    { status: true, home: "true" }
  ).sort({ createdAt: 1 }).lean();

  const clients = await ClientModel.find(
    { status: true }
  ).sort({ createdAt: 1 }).lean();

  const testimonials = await TestimonialModel.find(
    { status: true }
  ).sort({ createdAt: 1 }).lean();

  const promotions = await PromotionModel.find(
    { status: true }
  ).populate("category").populate("products").sort({ createdAt: 1 }).lean();

  const carousels = await CarouselModel.find(
    { status: true }
  ).sort({ createdAt: 1 }).lean();

  const youTubeVideos = await YouTubeModelModel.find(
    { status: true }
  ).sort({ createdAt: 1 }).lean();

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: {
      category: categories,
      subCategory: subCategories,
      bestSellingProduct: updatedBestSellingProducts,
      newArrivalProduct: updatedNewArrivalProducts,
      blog: blogs,
      client: clients,
      testimonial: testimonials,
      promotion: promotions,
      carousel: carousels,
      youTubeVideo: youTubeVideos,
    },
  });
});
