import mongoose from "mongoose";

const contactusSchema = new mongoose.Schema(
  {
    primaryMobile: {
      type: String,
      required: [true, "Primary mobile is required"],
    },
    secondaryMobile: {
      type: String,
      required: false,
    },
    primaryEmail: {
      type: String,
      required: [true, "Primary email is required"],
    },
    secondaryEmail: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    mapLink: {
      type: String,
      required: [true, "Map link is required"],
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

const ContactusModel = mongoose.model("Contactus", contactusSchema);

export default ContactusModel;