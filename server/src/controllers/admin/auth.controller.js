import UserModel from "../../models/user.model.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import ApiError from "../../helpers/apiError.js";
import generateToken from "../../helpers/generateToken.js";
import { buildPagination } from "../../utils/pagination.js";
import fs from "fs";
import path from "path";

// ------------------ SIGNUP ------------------
export const signup = asyncHandler(async (req, res) => {
  const { name, email, mobile, password } = req.body;

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

  return res.status(201).json({
    success: true,
    message: "Registered successfully",
    data: { user, token },
  });
});

// ------------------ LOGIN ------------------
export const login = asyncHandler(async (req, res) => {
  const { emailOrMobile, password } = req.body;

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
    data: user,
  });
});

// ------------------ GET ALL USERS ------------------
export const getUsers = asyncHandler(async (req, res) => {
  let {
    search,
    role,
    status,
    sort = "desc",
    page,
    limit,
  } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};

  if (search) {
    filters.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { mobile: { $regex: search, $options: "i" } },
    ];
  }

  if (role) {
    filters.role = role;
  }

  if (status !== undefined) {
    filters.status = status === "true";
  }

  let sortOption = {};
  if (sort === "asc") {
    sortOption = { createdAt: 1 };
  } else if (sort === "desc") {
    sortOption = { createdAt: -1 };
  } else {
    sortOption = sort;
  }

  const users = await UserModel
    .find(filters)
    .select("-password")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await UserModel.countDocuments(filters);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: users,
    pagination: buildPagination({ page, limit, total }),
  });
});

// ------------------ UPDATE USER ------------------
export const updateUser = asyncHandler(async (req, res) => {
  const { name, email, mobile, password, status } = req.body;

  const user = await UserModel.findById(req.params.id).select("+password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (req.files?.avatar?.[0]) {
    if (user.avatar && fs.existsSync(path.join(process.cwd(), user.avatar))) {
      fs.unlinkSync(path.join(process.cwd(), user.avatar));
    }

    user.avatar = await compressImage(req.files.avatar[0].buffer, "users");
  }

  if (email && email !== user.email) {
    const emailExists = await UserModel.findOne({ email });
    if (emailExists) {
      throw new ApiError(400, "Email already in use");
    }
    user.email = email;
  }

  if (mobile && mobile !== user.mobile) {
    const mobileExists = await UserModel.findOne({ mobile });
    if (mobileExists) {
      throw new ApiError(400, "Mobile number already in use");
    }
    user.mobile = mobile;
  }

  user.name = name || user.name;
  user.status = typeof status === "boolean" ? status : user.status;

  if (password) {
    user.password = password;
  }

  user.updatedAt = new Date();
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Updated successfully",
    data: user,
  });
});

