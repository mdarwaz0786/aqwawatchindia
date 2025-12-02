import YouTubeVideoModel from "../../models/youTubeVideo.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { buildPagination } from "../../utils/pagination.js";

export const createYouTubeVideo = asyncHandler(async (req, res) => {
  const {
    title,
    subTitle,
    description,
    youTubeVideoLink1,
    youTubeVideoLink2,
    youTubeVideoLink3,
    youTubeVideoLink4,
    youTubeVideoLink5,
    youTubeVideoLink6,
  } = req.body;

  const existing = await YouTubeVideoModel.findOne();
  if (existing) {
    throw new ApiError(400, "Only one record is allowed. Please update the existing one.");
  }

  if (!title) throw new ApiError(400, "Title is required");

  const video = await YouTubeVideoModel.create({
    title,
    subTitle,
    description,
    youTubeVideoLink1,
    youTubeVideoLink2,
    youTubeVideoLink3,
    youTubeVideoLink4,
    youTubeVideoLink5,
    youTubeVideoLink6,
    createdBy: req.user?._id,
  });

  return res.status(201).json({ success: true, message: "Created successfully", data: video });
});

export const getYouTubeVideos = asyncHandler(async (req, res) => {
  let { search, status, sort = "desc", page, limit } = req.query;

  page = parseInt(page, 10) || 1;
  limit = parseInt(limit, 10) || 10;
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) filters.$or = [
    { title: { $regex: search, $options: "i" } },
    { subTitle: { $regex: search, $options: "i" } }
  ];
  if (status === "true" || status === "false") filters.status = status === "true";

  let sortOption = {};
  if (sort === "asc") sortOption = { createdAt: 1 };
  else if (sort === "desc") sortOption = { createdAt: -1 };
  else sortOption = sort;

  const videos = await YouTubeVideoModel.find(filters)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await YouTubeVideoModel.countDocuments(filters);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: videos,
    pagination: buildPagination({ page, limit, total }),
  });
});

export const getYouTubeVideoById = asyncHandler(async (req, res) => {
  const video = await YouTubeVideoModel.findById(req.params.id);
  if (!video) throw new ApiError(404, "YouTube video not found");

  return res.status(200).json({ success: true, data: video });
});

export const updateYouTubeVideo = asyncHandler(async (req, res) => {
  const {
    title,
    subTitle,
    description,
    youTubeVideoLink1,
    youTubeVideoLink2,
    youTubeVideoLink3,
    youTubeVideoLink4,
    youTubeVideoLink5,
    youTubeVideoLink6,
    status
  } = req.body;

  const video = await YouTubeVideoModel.findById(req.params.id);
  if (!video) throw new ApiError(404, "YouTube video not found");

  video.title = title || video.title;
  video.subTitle = subTitle || video.subTitle;
  video.description = description || video.description;
  video.youTubeVideoLink1 = youTubeVideoLink1 || video.youTubeVideoLink1;
  video.youTubeVideoLink2 = youTubeVideoLink2 || video.youTubeVideoLink2;
  video.youTubeVideoLink3 = youTubeVideoLink3 || video.youTubeVideoLink3;
  video.youTubeVideoLink4 = youTubeVideoLink4 || video.youTubeVideoLink4;
  video.youTubeVideoLink5 = youTubeVideoLink5 || video.youTubeVideoLink5;
  video.youTubeVideoLink6 = youTubeVideoLink6 || video.youTubeVideoLink6;
  video.status = typeof status === "boolean" ? status : video.status;
  video.updatedBy = req.user?._id;
  video.updatedAt = new Date();

  await video.save();

  return res.status(200).json({ success: true, message: "Updated Successfully", data: video });
});

export const deleteYouTubeVideo = asyncHandler(async (req, res) => {
  const video = await YouTubeVideoModel.findById(req.params.id);
  if (!video) throw new ApiError(404, "YouTube video link not found");

  await video.deleteOne();

  return res.status(200).json({ success: true, message: "Deleted successfully" });
});
