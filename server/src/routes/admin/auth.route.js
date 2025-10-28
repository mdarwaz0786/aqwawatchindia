import express from "express";
import { signup, login, getLoggedInUser } from "../../controllers/admin/auth.controller.js";
import protect from "../../middlewares/admin/protect.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/loggedin-user", protect, getLoggedInUser);

export default router;
