import mongoose from "mongoose";

const shippingChargeSchema = new mongoose.Schema({
  state: {
    type: String,
    required: [true, "State is required"],
    trim: true,
    unique: [true, "This state already exits"]
  },
  charge: {
    type: Number,
    default: 40,
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
}, { timestamps: true });

const ShippingChargeModel = mongoose.model("ShippingCharge", shippingChargeSchema);

export default ShippingChargeModel;