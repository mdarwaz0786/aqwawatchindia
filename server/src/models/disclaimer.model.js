import mongoose from "mongoose";

const disclaimeSchema = new mongoose.Schema({
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

const DisclaimerModel = mongoose.model("Disclaime", disclaimeSchema);

export default DisclaimerModel;
