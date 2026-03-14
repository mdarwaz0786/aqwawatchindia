import BlogModel from "../../models/blog.model.js";
import SlugModel from "../../models/slug.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import compressImage from "../../helpers/compressImage.js";
import { generateUniqueSlug } from "../../helpers/generateUniqueSlug.js";
import fs from "fs";
import path from "path";
import { buildPagination } from "../../utils/pagination.js";
import { upsertMeta } from "../../utils/meta.js";
import MetaModel from "../../models/meta.model.js";

export const createBlog = asyncHandler(async (req, res) => {
  const {
    title,
    category,
    shortDescription,
    fullDescription,
    home,
    popularBlog,
    tags,
    numberOfComment,
    metaTitle,
    metaDescription,
    metaKeywords,
    metaAuthor,
  } = req.body;

  if (!title) throw new ApiError(400, "Title is required");

  let frontImagePath = null;
  let detailImagePath = null;
  let metaImagePath = null;

  try {
    if (req.files?.frontImage?.[0]) {
      frontImagePath = await compressImage(req.files.frontImage[0].buffer, "blog");
    }

    if (req.files?.detailImage?.[0]) {
      detailImagePath = await compressImage(req.files.detailImage[0].buffer, "blog");
    }

    if (req.files?.metaImage?.[0]) {
      metaImagePath = await compressImage(req.files.metaImage[0].buffer, "meta");
    };

    const blog = await BlogModel.create({
      title,
      category,
      shortDescription,
      fullDescription,
      home,
      popularBlog,
      tags,
      numberOfComment,
      frontImage: frontImagePath,
      detailImage: detailImagePath,
      createdBy: req.user?._id,
    });

    const slug = await generateUniqueSlug(title, "Blog", blog?._id, "blogs");
    blog.slug = slug;
    await blog.save();

    await upsertMeta({
      pageName: "blog-detail",
      metaTitle: metaTitle || title,
      metaDescription,
      metaKeywords,
      metaAuthor,
      metaImage: metaImagePath,
      slug,
      userId: req.user?._id,
    })

    return res.status(201).json({ success: true, data: blog });
  } catch (error) {
    if (frontImagePath && fs.existsSync(path.join(process.cwd(), frontImagePath))) {
      fs.unlinkSync(path.join(process.cwd(), frontImagePath));
    }
    if (detailImagePath && fs.existsSync(path.join(process.cwd(), detailImagePath))) {
      fs.unlinkSync(path.join(process.cwd(), detailImagePath));
    }
    if (metaImagePath && fs.existsSync(path.join(process.cwd(), metaImagePath))) {
      fs.unlinkSync(path.join(process.cwd(), metaImagePath));
    }
    throw new ApiError(500, error.message || "Something went wrong");
  }
});

export const getBlogs = asyncHandler(async (req, res) => {
  let { search, category, status, sort = "desc", page, limit } = req.query;

  page = parseInt(page, 10) || 1;
  limit = parseInt(limit, 10) || 10;
  const skip = (page - 1) * limit;

  const filters = {};
  if (search) filters.$or = [{ title: { $regex: search, $options: "i" } }];
  if (category) filters.category = category;
  if (status === "true" || status === "false") filters.status = status === "true";

  let sortOption = {};
  if (sort === "asc") sortOption = { createdAt: 1 };
  else if (sort === "desc") sortOption = { createdAt: -1 };
  else sortOption = sort;

  const blogs = await BlogModel.find(filters)
    .populate({ path: "category", strictPopulate: false })
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await BlogModel.countDocuments(filters);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: blogs,
    pagination: buildPagination({ page, limit, total }),
  });
});

export const getBlogById = asyncHandler(async (req, res) => {
  const blog = await BlogModel.findById(req.params.id)
    .populate({ path: "category", strictPopulate: false });

  if (!blog) throw new ApiError(404, "Blog not found");

  const meta = await MetaModel.findOne({
    slug: blog?.slug,
    pageName: "blog-detail",
  });

  return res.status(200).json({ success: true, message: "Data fetched successfully", data: { ...blog.toObject(), meta } });
});

export const updateBlog = asyncHandler(async (req, res) => {
  const {
    title,
    category,
    numberOfComment,
    shortDescription,
    fullDescription,
    home,
    popularBlog,
    tags,
    status,
    removeFrontImage,
    removeDetailImage,
    metaTitle,
    metaDescription,
    metaKeywords,
    metaAuthor,
  } = req.body;

  const blog = await BlogModel.findById(req.params.id);
  if (!blog) throw new ApiError(404, "Blog not found");

  const meta = await MetaModel.findOne({ slug: blog?.slug });

  if (removeFrontImage === "true") {
    if (blog.frontImage && fs.existsSync(path.join(process.cwd(), blog.frontImage))) {
      fs.unlinkSync(path.join(process.cwd(), blog.frontImage));
    }
    blog.frontImage = null;
  }

  if (removeDetailImage === "true") {
    if (blog.detailImage && fs.existsSync(path.join(process.cwd(), blog.detailImage))) {
      fs.unlinkSync(path.join(process.cwd(), blog.detailImage));
    }
    blog.detailImage = null;
  }

  if (req.files?.frontImage?.[0]) {
    if (blog?.frontImage && fs.existsSync(path.join(process.cwd(), blog.frontImage))) {
      fs.unlinkSync(path.join(process.cwd(), blog.frontImage));
    }
    blog.frontImage = await compressImage(req.files.frontImage[0].buffer, "blog");
  }

  if (req.files?.detailImage?.[0]) {
    if (blog?.detailImage && fs.existsSync(path.join(process.cwd(), blog.detailImage))) {
      fs.unlinkSync(path.join(process.cwd(), blog.detailImage));
    }
    blog.detailImage = await compressImage(req.files.detailImage[0].buffer, "blog");
  }

  console.log(req.files?.metaImage?.[0]);

  let metaImagePath = null;
  if (req.files?.metaImage?.[0]) {
    if (meta?.metaImage && fs.existsSync(path.join(process.cwd(), meta?.metaImage))) {
      fs.unlinkSync(path.join(process.cwd(), meta?.metaImage));
    }
    metaImagePath = await compressImage(req.files.metaImage[0].buffer, "meta");
  }

  let newSlug = null;
  if (title && title !== blog?.title) {
    await SlugModel.deleteOne({ collectionName: "Blog", documentId: blog?._id });
    newSlug = await generateUniqueSlug(title, "Blog", blog?._id, "blogs");
    blog.slug = newSlug;
  }

  blog.title = title || blog.title;
  blog.category = category || blog.category;
  blog.shortDescription = shortDescription || blog.shortDescription;
  blog.fullDescription = fullDescription || blog.fullDescription;
  blog.numberOfComment = numberOfComment || blog.numberOfComment;
  blog.home = home || blog.home;
  blog.popularBlog = popularBlog || blog.popularBlog;
  blog.tags = tags || blog.tags;
  blog.status = typeof status === "boolean" ? status : blog.status;
  blog.updatedBy = req.user?._id;
  blog.updatedAt = new Date();

  await blog.save();

  await upsertMeta({
    pageName: "blog-detail",
    metaTitle,
    metaDescription,
    metaKeywords,
    metaAuthor,
    metaImage: metaImagePath,
    slug: newSlug || blog?.slug,
    userId: req.user?._id,
  });

  return res.status(200).json({ success: true, message: "Updated Successfully", data: blog });
});

export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await BlogModel.findById(req.params.id);
  if (!blog) throw new ApiError(404, "Blog not found");

  const meta = await MetaModel.findOne({ slug: blog?.slug });

  if (blog?.frontImage && fs.existsSync(path.join(process.cwd(), blog.frontImage))) {
    fs.unlinkSync(path.join(process.cwd(), blog.frontImage));
  }

  if (blog?.detailImage && fs.existsSync(path.join(process.cwd(), blog.detailImage))) {
    fs.unlinkSync(path.join(process.cwd(), blog.detailImage));
  }

  if (meta?.metaImage && fs.existsSync(path.join(process.cwd(), meta?.metaImage))) {
    fs.unlinkSync(path.join(process.cwd(), meta?.metaImage));
  }

  await SlugModel.deleteOne({ collectionName: "Blog", documentId: blog?._id });
  await blog.deleteOne();
  await meta.deleteOne();

  return res.status(200).json({ success: true, message: "Deleted successfully" });
});
