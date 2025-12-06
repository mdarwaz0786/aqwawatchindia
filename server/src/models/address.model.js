import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    label: {
      type: String,
      enum: ["Home", "Work"],
      default: "Home",
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },
    state: {
      type: String,
      required: [true, "State is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    zip: {
      type: String,
      required: [true, "ZIP code is required"],
    },
    address: {
      type: String,
      trim: true,
      required: [true, "Address is required"],
    },
    instruction: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", addressSchema);

export default Address;
