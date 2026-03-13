import mongoose from "mongoose";

const metaSchema = new mongoose.Schema({
  pageName: {
    type: String,
    trim: true,
    enum: [
      "home",
      "blog",
      "blog-detail",
      "about-us",
      "contact-us",
      "become-dealer",
      "products",
      "product-detail",
      "terms-conditions",
      "return-refund-policy",
      "billing-shipping-policy",
      "privacy-policy",
      "cookie-policy",
      "disclaimer",
      "cart",
      "checkout",
      "dashboard",
      "profile",
      "invoice",
      "login",
      "signup",
      "forgot-password"
    ],
    index: true,
  },
  metaTitle: {
    type: String,
    trim: true,
  },
  slug: {
    type: String,
    trim: true,
    default: null,
    index: true,
  },
  metaDescription: {
    type: String,
    trim: true,
  },
  metaKeywords: {
    type: String,
    trim: true,
  },
  metaAuthor: {
    type: String,
    trim: true,
    default: null,
  },
  metaImage: {
    type: String,
    trim: true,
    default: null,
  },
  canonicalUrl: {
    type: String,
    trim: true,
    default: "https://www.aquawatchindia.com",
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

const MetaModel = mongoose.model("Meta", metaSchema);

export default MetaModel;
