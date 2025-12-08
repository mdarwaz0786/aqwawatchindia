import AboutusModel from "../../models/aboutus.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import compressImage from "../../helpers/compressImage.js";
import fs from "fs";
import path from "path";

// create or update single about us
export const createOrUpdateAboutUs = asyncHandler(async (req, res) => {
  const {
    description,
    contact,
    experience,
    name,
    shortInfo,
    happyCustomer,
    expertTeam,
    awardWinning,
    averageRating,
  } = req.body;

  if (!description) throw new ApiError(400, "Description is required");
  if (!contact) throw new ApiError(400, "Contact is required");
  if (!experience) throw new ApiError(400, "Experience is required");
  if (!name) throw new ApiError(400, "Name is required");
  if (!shortInfo) throw new ApiError(400, "Short info is required");

  const existing = await AboutusModel.findOne();

  let imagePath = existing?.image;

  try {
    if (req.files?.image?.[0]) {
      if (existing?.image && fs.existsSync(path.join(process.cwd(), existing.image))) {
        fs.unlinkSync(path.join(process.cwd(), existing.image));
      }
      imagePath = await compressImage(req.files.image[0].buffer, "aboutus");
    } else if (!existing) {
      throw new ApiError(400, "Image is required");
    }

    if (existing) {
      existing.description = description;
      existing.contact = contact;
      existing.experience = experience;
      existing.name = name;
      existing.shortInfo = shortInfo;
      existing.image = imagePath;
      existing.happyCustomer = happyCustomer || existing.happyCustomer;
      existing.expertTeam = expertTeam || existing.expertTeam;
      existing.awardWinning = awardWinning || existing.awardWinning;
      existing.averageRating = averageRating || existing.averageRating;
      existing.updatedBy = req.user?._id;
      await existing.save();

      return res.status(200).json({
        success: true,
        message: "Updated successfully",
        data: existing,
      });
    }

    const data = await AboutusModel.create({
      description,
      contact,
      experience,
      name,
      shortInfo,
      image: imagePath,
      happyCustomer,
      expertTeam,
      awardWinning,
      averageRating,
      createdBy: req.user?._id,
    });

    return res.status(201).json({
      success: true,
      message: "Created successfully",
      data,
    });
  } catch (error) {
    if (imagePath && !existing && fs.existsSync(path.join(process.cwd(), imagePath))) {
      fs.unlinkSync(path.join(process.cwd(), imagePath));
    }
    throw new ApiError(500, error.message || "Something went wrong");
  }
});

// get only one
export const getAboutUs = asyncHandler(async (req, res) => {
  const data = await AboutusModel.findOne();
  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data,
  });
});

// delete
export const deleteAboutUs = asyncHandler(async (req, res) => {
  const data = await AboutusModel.findOne();
  if (!data) throw new ApiError(404, "No record found");

  if (data.image && fs.existsSync(path.join(process.cwd(), data.image))) {
    fs.unlinkSync(path.join(process.cwd(), data.image));
  }

  await data.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Deleted successfully",
  });
});
