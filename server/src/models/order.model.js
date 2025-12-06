import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  paymentMethod: {
    type: String,
    enum: ["COD", "ONLINE"],
    required: [true, "Payment method is required"],
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed", "Refunded"],
    default: "Pending",
  },
  orderStatus: {
    type: String,
    enum: [
      "Pending",
      "Confirmed",
      "Processing",
      "Shipped",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
      "Returned",
    ],
    default: "Pending",
  },
  subtotal: {
    type: Number,
    required: true,
  },
  shippingCharge: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentId: {
    type: String,
    default: null,
  },
  status: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

orderSchema.virtual("items", {
  ref: "OrderItem",
  localField: "_id",
  foreignField: "order",
  justOne: false,
});

orderSchema.virtual("address", {
  ref: "OrderAddress",
  localField: "_id",
  foreignField: "order",
  justOne: true,
});

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;
