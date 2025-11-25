import CartModel from "../../models/cart.model.js";
import ProductModel from "../../models/product.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";

// Add Product to Cart
export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1, userId } = req.body;

  if (!productId) throw new ApiError(400, "Product is required");
  if (!userId) throw new ApiError(400, "User is required");

  const product = await ProductModel.findById(productId);
  if (!product) throw new ApiError(404, "Product not found");

  let cartItem = await CartModel.findOne({ user: userId, product: productId });

  const itemTotalPrice = product.salePrice * quantity;

  if (!cartItem) {
    cartItem = await CartModel.create({
      user: userId,
      product: product?._id,
      quantity,
      price: product?.salePrice,
      totalPrice: itemTotalPrice,
      createdBy: userId,
    });
    return res.status(200).json({ success: true, message: "Product added to cart", data: cartItem });
  } else {
    if (cartItem?.quantity === 1 && quantity === -1) {
      await cartItem.deleteOne();
      return res.status(200).json({ success: true, message: "Product removed from cart" });
    } else {
      cartItem.quantity += quantity;
      cartItem.totalPrice = cartItem.quantity * product.salePrice;
      cartItem.updatedBy = userId;
      cartItem.updatedAt = new Date();
      await cartItem.save();
      return res.status(200).json({ success: true, message: "Product quantity updated", data: cartItem });
    };
  };
});

// Get Cart for User
export const getCart = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) throw new ApiError(400, "User is required");

  const cartItems = await CartModel
    .find({ user: userId })
    .populate("product", "name salePrice images slug stock");

  if (!cartItems.length) return res.status(200).json({ success: true, message: "Cart is empty", data: [] });
  const totalAmount = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  return res.status(200).json({ success: true, data: cartItems, totalAmount });
});

// Update Cart Item Quantity
export const updateCartProduct = asyncHandler(async (req, res) => {
  const { productId, quantity, userId } = req.body;

  if (!userId) throw new ApiError(400, "User is required");

  if (!productId) throw new ApiError(400, "Product is required");
  if (!quantity || quantity < 1) throw new ApiError(400, "Quantity is required");

  const cartItem = await CartModel.findOne({ user: userId, product: productId });
  if (!cartItem) throw new ApiError(404, "Product not found in cart");

  const product = await ProductModel.findById(productId);
  cartItem.quantity = quantity;
  cartItem.totalPrice = product.salePrice * quantity;
  cartItem.updatedBy = userId;
  cartItem.updatedAt = new Date();
  await cartItem.save();

  return res.status(200).json({ success: true, message: "Cart updated", data: cartItem });
});

// Remove Product from Cart
export const removeFromCart = asyncHandler(async (req, res) => {
  const { productId, userId } = req.params;

  if (!userId) throw new ApiError(400, "User is required");
  if (!productId) throw new ApiError(400, "Product is required");

  const cartItem = await CartModel.findOneAndDelete({ user: userId, product: productId });
  if (!cartItem) throw new ApiError(404, "Product not found in cart");

  return res.status(200).json({ success: true, message: "Product removed from cart", data: cartItem });
});

// Clear Cart
export const clearCart = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (!userId) throw new ApiError(400, "User is required");
  await CartModel.deleteMany({ user: userId });
  return res.status(200).json({ success: true, message: "Cart cleared", data: [] });
});
