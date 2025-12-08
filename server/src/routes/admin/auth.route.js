import express from "express";
import { signup, login, getLoggedInUser, getUsers, updateUser } from "../../controllers/admin/auth.controller.js";
import protect from "../../middlewares/admin/protect.middleware.js";
import validateFileSize from "../../middlewares/validateFileSize.middleware.js";
import upload from "../../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/loggedin-user", protect, getLoggedInUser);
router.get("/all-user", protect, getUsers);
router.patch(
  "/update-profile/:id",
  protect,
  upload.fields([
    { name: "avatar", maxCount: 1 },
  ]),
  validateFileSize,
  updateUser,
);

export default router;
