import mongoose from "mongoose";

const returnRefundPolicySchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    default: "Return and Refund Policy"
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

const ReturnRefundPolicyModel = mongoose.model("ReturnRefundPolicy", returnRefundPolicySchema);

export default ReturnRefundPolicyModel;
