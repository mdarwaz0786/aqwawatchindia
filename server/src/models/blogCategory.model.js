import mongoose from "mongoose";

const blogCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
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

const BlogCategoryModel = mongoose.model("BlogCategory", blogCategorySchema);

export default BlogCategoryModel;


