import mongoose from "mongoose";

const contactEnquiryFormSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Title is required"],
  },
  name: {
    type: Number,
    enum: [0, 1],
    default: 1,
  },
  email: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
  mobile: {
    type: Number,
    enum: [0, 1],
    default: 1,
  },
  subject: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
  message: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
  service: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
  country: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
  state: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
  city: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
  zip: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
  address: {
    type: Number,
    enum: [0, 1],
    default: 0,
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

const ContactEnquiryFormModel = mongoose.model("ContactEnquiryForm", contactEnquiryFormSchema);

export default ContactEnquiryFormModel;

