import UserModel from "../../models/user.model.js";
import AddressModel from "../../models/address.model.js";
import BlogModel from "../../models/blog.model.js";
import BlogCategoryModel from "../../models/blogCategory.model.js";
import BrandModel from "../../models/brand.model.js";
import CarouselModel from "../../models/carousel.model.js";
import CategoryModel from "../../models/category.model.js";
import SubCategoryModel from "../../models/subCategory.model.js";
import ClientModel from "../../models/client.model.js";
import OrderModel from "../../models/order.model.js";
import ProductModel from "../../models/product.model.js";
import PromotionModel from "../../models/promotion.model.js";
import TestimonialModel from "../../models/testimonial.model.js";
import YouTubeVideoModel from "../../models/youTubeVideo.model.js";
import ContactEnquiryModel from "../../models/contactEnquiry.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalAddresses,
      totalBlogs,
      totalBlogCategories,
      totalBrands,
      totalCarousels,
      totalCategories,
      totalSubCategories,
      totalClients,
      totalOrders,
      totalProducts,
      totalPromotions,
      totalTestimonials,
      totalYouTubeVideos,
      totalContactEnquiries,
    ] = await Promise.all([
      UserModel.countDocuments(),
      AddressModel.countDocuments(),
      BlogModel.countDocuments(),
      BlogCategoryModel.countDocuments(),
      BrandModel.countDocuments(),
      CarouselModel.countDocuments(),
      CategoryModel.countDocuments(),
      SubCategoryModel.countDocuments(),
      ClientModel.countDocuments(),
      OrderModel.countDocuments(),
      ProductModel.countDocuments(),
      PromotionModel.countDocuments(),
      TestimonialModel.countDocuments(),
      YouTubeVideoModel.countDocuments(),
      ContactEnquiryModel.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: {
        totalUsers,
        totalAddresses,
        totalBlogs,
        totalBlogCategories,
        totalBrands,
        totalCarousels,
        totalCategories,
        totalSubCategories,
        totalClients,
        totalOrders,
        totalProducts,
        totalPromotions,
        totalTestimonials,
        totalYouTubeVideos,
        totalContactEnquiries,
        totalSettings: 1,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
