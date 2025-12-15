import OrderModel from "../../models/order.model.js";
import OrderItemModel from "../../models/orderItem.model.js";
import OrderAddressModel from "../../models/orderAddress.model.js";
import ShippingChargeModel from "../../models/shippingCharge.model.js";
import CartModel from "../../models/cart.model.js";
import Address from "../../models/address.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

// create order
export const createOrder = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const { addressId, address, paymentMethod } = req.body;

  if (!userId) throw new ApiError(404, "User is required");

  let finalAddress;
  let state;

  if (addressId) {
    finalAddress = await Address.findOne({ _id: addressId, user: userId }).populate("user");
    if (!finalAddress) throw new ApiError(404, "Address not found");
    state = finalAddress.state;
  } else {
    const requiredAddress = ["name", "email", "mobile", "country", "state", "city", "zip", "address"];
    for (const field of requiredAddress) {
      if (!address?.[field]) throw new ApiError(400, `${field} is required`);
    };
    finalAddress = await Address.create({
      user: userId,
      label: address?.label || "Home",
      country: address.country,
      state: address?.state,
      city: address?.city,
      zip: address?.zip,
      address: address?.address,
      instruction: address?.instruction || "",
    });
    state = address.state;
  }

  const shippingData = await ShippingChargeModel.findOne({ state, status: true });
  const shippingCharge = shippingData ? shippingData?.charge : 40;

  const cartItems = await CartModel.find({ user: userId }).populate("product");
  if (!cartItems || cartItems?.length === 0) throw new ApiError(400, "Your cart is empty");

  const items = cartItems?.map((item) => {
    const price = item?.product?.salePrice;
    const quantity = item?.quantity;
    const gstPercent = item?.product?.gstPercent || 0;

    const itemTotal = price * quantity;
    const gstAmount = (itemTotal * gstPercent) / 100;

    return {
      product: item?.product?._id,
      name: item?.product?.name,
      image: item?.product?.images?.[0],
      price,
      quantity,
      gstPercent,
      gstAmount,
      totalWithGst: itemTotal + gstAmount,
    };
  });

  const subtotal = items?.reduce((sum, item) => sum + item?.price * item?.quantity, 0);
  const totalGst = items.reduce((sum, item) => sum + item.gstAmount, 0);

  const totalDiscount = cartItems?.reduce((sum, c) => {
    const mrp = c?.product?.mrpPrice || 0;
    const sale = c?.product?.salePrice || 0;
    return sum + (mrp - sale) * c?.quantity;
  }, 0);

  const totalAmount = subtotal + totalGst + shippingCharge;

  const order = await OrderModel.create({
    user: userId,
    paymentMethod,
    paymentStatus: "Pending",
    orderStatus: "Pending",
    subtotal,
    shippingCharge,
    totalGst,
    totalAmount,
    discount: totalDiscount,
    createdBy: userId,
  });

  const itemData = items?.map((item) => ({
    order: order?._id,
    product: item?.product,
    name: item?.name,
    image: item?.image,
    price: item?.price,
    quantity: item?.quantity,
    gstPercent: item?.gstPercent,
    gstAmount: item?.gstAmount,
    total: item?.totalWithGst,
  }));

  await OrderItemModel.insertMany(itemData);

  await OrderAddressModel.create({
    order: order?._id,
    label: finalAddress?.label,
    name: address?.name || finalAddress?.user?.name,
    email: address?.email || finalAddress?.user?.email,
    mobile: address?.mobile || finalAddress?.user?.mobile,
    country: finalAddress?.country,
    state: finalAddress?.state,
    city: finalAddress?.city,
    zip: finalAddress?.zip,
    address: finalAddress?.address,
    instruction: finalAddress?.instruction || "",
  });

  await CartModel.deleteMany({ user: userId });

  const orderDetails = {
    order,
    items: await OrderItemModel.find({ order: order?._id }),
    address: await OrderAddressModel.findOne({ order: order?._id }),
  };

  return res.status(201).json({
    success: true,
    message: "Order placed successfully",
    data: orderDetails,
  });
});

// ---------------- GET ALL ORDERS ----------------
export const getOrders = asyncHandler(async (req, res) => {
  let { search, orderStatus, paymentMethod, paymentStatus, page = 1, limit = 10, sort = "desc" } = req.query;
  const userId = req.user?._id;

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
  filters.user = userId;

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
  const userId = req.user?._id;
  const order = await OrderModel.findById(req.params.id)
    .populate("user", "-password")
    .populate("items")
    .populate("address");

  if (!order) throw new ApiError(404, "Order not found");

  if (order?.user?._id.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not allowed to view this order");
  };

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: order,
  });
});

// ---------------- UPDATE ORDER ----------------
export const updateOrder = asyncHandler(async (req, res) => {
  const { orderStatus } = req.body;

  const order = await OrderModel.findById(req.params.id);
  if (!order) throw new ApiError(404, "Order not found");

  order.orderStatus = orderStatus || order.orderStatus;
  order.updatedBy = req.user?._id;
  order.updatedAt = new Date();

  await order.save();

  const updatedOrder = await OrderModel.findById(req.params.id)
    .populate("user", "-password")
    .populate("items")
    .populate("address");

  return res.status(200).json({
    success: true,
    message: "Updated successfully",
    data: updatedOrder,
  });
});

