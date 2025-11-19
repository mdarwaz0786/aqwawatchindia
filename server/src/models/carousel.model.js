import mongoose from "mongoose";

const carouselSchema = new mongoose.Schema({
  banner: {
    type: String,
  },
  navigateTo: {
    type: String,
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

const CarouselModel = mongoose.model("Carousel", carouselSchema);

export default CarouselModel;


