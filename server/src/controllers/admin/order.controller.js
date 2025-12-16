import OrderModel from "../../models/order.model.js";
import OrderItemModel from "../../models/orderItem.model.js";
import OrderAddressModel from "../../models/orderAddress.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// ---------------- GET ALL ORDERS ----------------
export const getOrders = asyncHandler(async (req, res) => {
  let { search, orderStatus, paymentMethod, paymentStatus, page = 1, limit = 10, sort = "desc" } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};

  if (search) {
    filters.$or = [
      { paymentMethod: { $regex: search, $options: "i" } },
      { paymentStatus: { $regex: search, $options: "i" } },
      { orderStatus: { $regex: search, $options: "i" } },
    ];
  };

  if (orderStatus) filters.orderStatus = orderStatus;
  if (paymentStatus) filters.paymentStatus = paymentStatus;
  if (paymentMethod) filters.paymentMethod = paymentMethod;

  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  let orders = await OrderModel.find(filters)
    .populate("user", "-password")
    .populate("items")
    .populate("address")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await OrderModel.countDocuments(filters);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: orders,
    pagination: buildPagination({ page, limit, total }),
  });
});

// ---------------- GET SINGLE ORDER ----------------
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await OrderModel.findById(req.params.id)
    .populate("user", "-password")
    .populate("items")
    .populate("address");

  if (!order) throw new ApiError(404, "Order not found");

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: order,
  });
});

// ---------------- UPDATE ORDER ----------------
export const updateOrder = asyncHandler(async (req, res) => {
  const { orderStatus, status } = req.body;

  const order = await OrderModel.findById(req.params.id);
  if (!order) throw new ApiError(404, "Order not found");

  order.orderStatus = orderStatus || order.orderStatus;
  order.status = typeof status === "boolean" ? status : order?.status;
  if (orderStatus === "Delivered") order.paymentStatus = "Paid";
  order.updatedBy = req.user?._id;
  order.updatedAt = new Date();

  await order.save();

  const updatedOrder = await OrderModel
    .findById(req.params.id)
    .populate("user", "-password")
    .populate("items")
    .populate("address");

  return res.status(200).json({
    success: true,
    message: "Updated successfully",
    data: updatedOrder,
  });
});

// ---------------- DELETE ORDER ----------------
export const deleteOrder = asyncHandler(async (req, res) => {
  const order = await OrderModel.findById(req.params.id);
  if (!order) throw new ApiError(404, "Order not found");

  await OrderItemModel.deleteMany({ order: order?._id });
  await OrderAddressModel.deleteMany({ order: order?._id });

  await order.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Deleted successfully",
  });
});

