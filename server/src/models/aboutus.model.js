import mongoose from "mongoose";

const aboutusSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    contact: {
      type: String,
      required: [true, "Contact is required"],
    },
    experience: {
      type: String,
      required: [true, "Experience is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    shortInfo: {
      type: String,
      required: [true, "Short info is required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    happyCustomer: {
      type: Number,
      default: 0,
    },
    expertTeam: {
      type: Number,
      default: 0,
    },
    awardWinning: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
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
  },
  { timestamps: true }
);

const AboutusModel = mongoose.model("Aboutus", aboutusSchema);

export default AboutusModel;