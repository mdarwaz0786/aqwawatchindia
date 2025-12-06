import mongoose from "mongoose";

const cookiePolicySchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    default: "Disclaimer"
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

const CookiePolicyModel = mongoose.model("CookiePolicy", cookiePolicySchema);

export default CookiePolicyModel;
