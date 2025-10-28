import jwt from "jsonwebtoken";
import UserModel from "../../models/user.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    throw new ApiError(401, "Authentication token missing.");
  };

  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await UserModel.findById(decoded.id).select("-password");

  if (!user) {
    throw new ApiError(401, "User not found.");
  };

  req.user = user;
  next();
});

export default protect;
