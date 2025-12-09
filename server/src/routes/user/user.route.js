import express from "express";
import homePageRoute from "./homePage.route.js";
import productRoute from "./product.route.js";
import cartRoute from "./cart.route.js";
import authRoute from "./auth.route.js";
import addressRoute from "./address.route.js";
import orderRoute from "./order.route.js";
import blogRoute from "./blog.route.js";
import shippingChargeRoute from "./shippingCharge.route.js";

const router = express.Router();

router.use("/home-page", homePageRoute);
router.use("/product", productRoute);
router.use("/cart", cartRoute);
router.use("/auth", authRoute);
router.use("/address", addressRoute);
router.use("/order", orderRoute);
router.use("/blog", blogRoute);
router.use("/shipping-charge", shippingChargeRoute);

export default router;