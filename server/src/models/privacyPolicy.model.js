import mongoose from "mongoose";

const privacyPolicySchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    default: "Privacy and Policy"
  },
  description: {
    type: String,
    trim: true,
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
}, { timestamps: true });

const PrivacyPolicyModel = mongoose.model("PrivacyPolicy", privacyPolicySchema);

export default PrivacyPolicyModel;
