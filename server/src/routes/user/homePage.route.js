import express from "express";
import { getHomePageData } from "../../controllers/user/homePage.controller.js";

const router = express.Router();

router.get("/", getHomePageData);

export default router;
