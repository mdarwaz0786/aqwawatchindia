import mongoose from "mongoose";

const youTubeVideoSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  subTitle: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  youTubeVideoLink1: {
    type: String,
    trim: true,
  },
  youTubeVideoLink2: {
    type: String,
    trim: true,
  },
  youTubeVideoLink3: {
    type: String,
    trim: true,
  },
  youTubeVideoLink4: {
    type: String,
    trim: true,
  },
  youTubeVideoLink5: {
    type: String,
    trim: true,
  },
  youTubeVideoLink6: {
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

const YouTubeVideoModel = mongoose.model("YouTubeVideo", youTubeVideoSchema);

export default YouTubeVideoModel;


