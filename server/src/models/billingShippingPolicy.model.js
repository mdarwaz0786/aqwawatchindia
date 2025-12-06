import mongoose from "mongoose";

const billingShippingPolicySchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    default: "Billing and Shipping Policy",
  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    default: "true",
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

const BillingShippingPolicyModel = mongoose.model("BillingShippingPolicy", billingShippingPolicySchema);

export default BillingShippingPolicyModel;
