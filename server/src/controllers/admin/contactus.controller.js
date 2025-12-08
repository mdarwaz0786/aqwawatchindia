import ContactusModel from "../../models/contactus.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import compressImage from "../../helpers/compressImage.js";
import fs from "fs";
import path from "path";

// create or update single contact us
export const createOrUpdateContactUs = asyncHandler(async (req, res) => {
  const {
    primaryMobile,
    secondaryMobile,
    primaryEmail,
    secondaryEmail,
    location,
    mapLink,
  } = req.body;

  if (!primaryMobile) throw new ApiError(400, "Primary mobile is required");
  if (!primaryEmail) throw new ApiError(400, "Primary email is required");
  if (!location) throw new ApiError(400, "Location is required");
  if (!mapLink) throw new ApiError(400, "Map link is required");

  const existing = await ContactusModel.findOne();

  let imagePath = existing?.image;

  try {
    if (req.files?.image?.[0]) {
      if (existing?.image && fs.existsSync(path.join(process.cwd(), existing.image))) {
        fs.unlinkSync(path.join(process.cwd(), existing.image));
      }
      imagePath = await compressImage(req.files.image[0].buffer, "contactus");
    } else if (!existing) {
      throw new ApiError(400, "Image is required");
    }

    if (existing) {
      existing.primaryMobile = primaryMobile;
      existing.secondaryMobile = secondaryMobile;
      existing.primaryEmail = primaryEmail;
      existing.secondaryEmail = secondaryEmail;
      existing.location = location;
      existing.mapLink = mapLink;
      existing.image = imagePath;
      existing.updatedBy = req.user?._id;
      await existing.save();

      return res.status(200).json({
        success: true,
        message: "Updated successfully",
        data: existing,
      });
    }

    const data = await ContactusModel.create({
      primaryMobile,
      secondaryMobile,
      primaryEmail,
      secondaryEmail,
      location,
      mapLink,
      image: imagePath,
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
export const getContactUs = asyncHandler(async (req, res) => {
  const data = await ContactusModel.findOne();
  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data,
  });
});

// delete
export const deleteContactUs = asyncHandler(async (req, res) => {
  const data = await ContactusModel.findOne();
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
