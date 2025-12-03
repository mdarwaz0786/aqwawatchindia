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
    trim: true,
  },
  frontImage: {
    type: String,
    trim: true,
  },
  detailImage: {
    type: String,
    trim: true,
  },
  shortDescription: {
    type: String,
    trim: true,
  },
  fullDescription: {
    type: String,
    trim: true,
  },
  home: {
    type: String,
    default: "false",
  },
  popularBlog: {
    type: String,
    default: "false",
  },
  tags: {
    type: String,
    trim: true,
  },
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


