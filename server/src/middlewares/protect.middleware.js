import jwt from "jsonwebtoken";
import ApiError from "../helpers/apiError.js";
import asyncHandler from "../helpers/asyncHandler.js";
import UserModel from "../models/user.model.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  console.log(token);

  if (!token) {
    throw new ApiError(401, "Not authorized, token missing");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await UserModel.findById(decoded.id);
    if (!req.user) throw new ApiError(401, "User not found");
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid token");
  }
});
