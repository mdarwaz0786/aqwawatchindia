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

const PrivacyPolicyModel = mongoose.model("PrivacyPolicy", privacyPolicySchema);

export default PrivacyPolicyModel;
