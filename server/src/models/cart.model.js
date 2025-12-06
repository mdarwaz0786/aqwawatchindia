import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: {
    type: String,
    ref: "User",
    required: [true, "User is required"],
    index: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Product is required"],
    index: true,
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: String,
    ref: "User",
    default: null,
  },
  updatedBy: {
    type: String,
    ref: "User",
    default: null,
  },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

const CartModel = mongoose.model("Cart", cartSchema);

export default CartModel;
