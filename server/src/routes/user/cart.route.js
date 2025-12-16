import express from "express";
import {
  addToCart,
  updateCartProduct,
  removeFromCart,
  clearCart,
  getCarts,
} from "../../controllers/user/cart.controller.js";

const router = express.Router();

// Add product to cart
router.post("/add", addToCart);

// Get cart for user
router.get("/:userId", getCarts);

// Update quantity of a product in cart
router.put("/update", updateCartProduct);

// Remove a product from cart
router.delete("/remove/:productId/:userId", removeFromCart);

// Clear entire cart
router.delete("/clear/:userId", clearCart);

export default router;
