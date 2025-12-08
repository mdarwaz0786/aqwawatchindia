import UserModel from "../../models/user.model.js";
import CartModel from "../../models/cart.model.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import ApiError from "../../helpers/apiError.js";
import generateToken from "../../helpers/generateToken.js";

// ------------------ SIGNUP ------------------
export const signup = asyncHandler(async (req, res) => {
  const { name, email, mobile, password, userId } = req.body;

  if (!name) {
    throw new ApiError(400, "Name is required");
  }

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  if (!mobile) {
    throw new ApiError(400, "Mobile number is required");
  }

  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  const existingUser = await UserModel.findOne({ $or: [{ email }, { mobile }] });
  if (existingUser) {
    throw new ApiError(400, "Email or mobile already in use");
  }

  const user = await UserModel.create({ name, email, mobile, password });

  const token = generateToken(user?._id);

  if (!token) {
    throw new ApiError(401, "Something went wrong");
  }

  if (userId) {
    await CartModel.updateMany(
      { user: userId },
      { $set: { user: user?._id } }
    );
  };

  return res.status(201).json({
    success: true,
    message: "Registered successfully",
    data: { user, token },
  });
});

// ------------------ LOGIN ------------------
export const login = asyncHandler(async (req, res) => {
  const { emailOrMobile, password, userId } = req.body;

  if (!emailOrMobile) {
    throw new ApiError(400, "Email or mobile number is required");
  }

  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  const user = await UserModel.findOne({
    $or: [{ email: emailOrMobile }, { mobile: emailOrMobile }],
  }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = generateToken(user?._id);

  if (!token) {
    throw new ApiError(401, "Something went wrong");
  }

  if (userId) {
    await CartModel.updateMany(
      { user: userId },
      { $set: { user: user?._id } }
    );
  };

  return res.status(200).json({
    success: true,
    message: "Login successful",
    data: { user, token },
  });
});

// ------------------ GET LOGGED-IN USER ------------------
export const getLoggedInUser = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json({
    success: true,
    message: "Loggedin user fetched successfully",
    data: user,
  });
});
