import express from "express";
import authRoute from "./auth.route.js";
import categoryRoute from "./category.route.js";
import subCategoryRoute from "./subCategory.route.js";
import subSubCategoryRoute from "./subSubCategory.route.js";
import colorRoute from "./color.routes.js";
import brandRoute from "./brand.route.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/category", categoryRoute);
router.use("/sub-category", subCategoryRoute);
router.use("/sub-sub-category", subSubCategoryRoute);
router.use("/color", colorRoute);
router.use("/brand", brandRoute);

export default router;