import mongoose from "mongoose";

const subSubCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    trim: true,
    unique: true,
    maxlength: [100, "name must not exceed 100 characters"],
  },
  slug: {
    type: String,
    trim: true,
    lowercase: true,
  },
  image: {
    type: String,
    trim: true,
  },
  icon: {
    type: String,
    trim: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category is required"],
    index: true,
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: [true, "Subcategory is required"],
    index: true,
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

subSubCategorySchema.index({ name: 1 });
subSubCategorySchema.index({ category: 1, subCategory: 1 });

const SubSubCategoryModel = mongoose.model("SubSubCategory", subSubCategorySchema);

export default SubSubCategoryModel;
