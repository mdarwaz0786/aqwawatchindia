import mongoose from "mongoose";

const orderAddressSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  label: {
    type: String,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  mobile: {
    type: String,
    trim: true,
  },
  country: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  zip: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  instruction: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

const OrderAddressModel = mongoose.model("OrderAddress", orderAddressSchema);

export default OrderAddressModel;

