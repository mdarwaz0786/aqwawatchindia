import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BlogCategory",
    index: true,
    default: null,
  },
  title: {
    type: String,
  },
  frontImage: {
    type: String,
  },
  detailImage: {
    type: String,
  },
  shortDescription: {
    type: String,
  },
  fullDescription: {
    type: String,
  },
  home: {
    type: Boolean,
    default: false,
  },
  popularBlog: {
    type: Boolean,
    default: false,
  },
  tags: [{
    type: String,
  }],
  numberOfComment: {
    type: Number,
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

const BlogModel = mongoose.model("Blog", blogSchema);

export default BlogModel;


