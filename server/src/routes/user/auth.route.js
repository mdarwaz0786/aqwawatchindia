import express from "express";
import { signup, login, getLoggedInUser, updateUser } from "../../controllers/user/auth.controller.js";
import protect from "../../middlewares/user/protect.middleware.js";
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";
import upload from "../../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/loggedin-user", protect, getLoggedInUser);
router.patch(
  "/update-profile",
  protect,
  upload.fields([
    { name: "avatar", maxCount: 1 },
  ]),
  validateFileSize,
  updateUser,
);

export default router;
