import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema({
  banner: {
    type: String,
    trim: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    index: true,
    default: null,
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    index: true,
    default: null,
  }],
  position: {
    type: String,
    enum: ["Left", "Right"],
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

const PromotionModel = mongoose.model("Promotion", promotionSchema);

export default PromotionModel;


