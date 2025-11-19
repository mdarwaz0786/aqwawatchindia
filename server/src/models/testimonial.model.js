import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  userName: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  rating: {
    type: Number,
    trim: true,
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

const TestimonialModel = mongoose.model("Testimonial", testimonialSchema);

export default TestimonialModel;


