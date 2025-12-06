import mongoose from "mongoose";

const termConditionSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    default: "Term and Condition"
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

const TermConditionModel = mongoose.model("TermCondition", termConditionSchema);

export default TermConditionModel;
