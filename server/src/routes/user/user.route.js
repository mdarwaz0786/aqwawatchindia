import express from "express";
import homePageRoute from "./homePage.route.js";
import productRoute from "./product.route.js";

const router = express.Router();

router.use("/home-page", homePageRoute);
router.use("/product", productRoute);

export default router;