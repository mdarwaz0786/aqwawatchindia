import ClientModel from "../../models/client.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import compressImage from "../../helpers/compressImage.js";
import fs from "fs";
import path from "path";
import { buildPagination } from "../../utils/pagination.js";

export const createClient = asyncHandler(async (req, res) => {
  let logoPath = null;
  try {
    if (!req.files?.logo?.[0]) throw new ApiError(400, "Logo is required");
    logoPath = await compressImage(req.files.logo[0].buffer, "client");

    const client = await ClientModel.create({
      logo: logoPath,
      createdBy: req.user?._id,
    });

    return res.status(201).json({ success: true, data: client });
  } catch (error) {
    if (logoPath && fs.existsSync(path.join(process.cwd(), logoPath))) {
      fs.unlinkSync(path.join(process.cwd(), logoPath));
    }
    throw new ApiError(500, error.message || "Something went wrong");
  }
});

export const getClients = asyncHandler(async (req, res) => {
  let { status, sort = "desc", page, limit } = req.query;

  page = parseInt(page, 10) || 1;
  limit = parseInt(limit, 10) || 10;
  const skip = (page - 1) * limit;

  const filters = {};
  if (status === "true" || status === "false") filters.status = status === "true";

  let sortOption = {};
  if (sort === "asc") sortOption = { createdAt: 1 };
  else if (sort === "desc") sortOption = { createdAt: -1 };
  else sortOption = sort;

  const clients = await ClientModel.find(filters)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await ClientModel.countDocuments(filters);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: clients,
    pagination: buildPagination({ page, limit, total }),
  });
});

export const getClientById = asyncHandler(async (req, res) => {
  const client = await ClientModel.findById(req.params.id);
  if (!client) throw new ApiError(404, "Client not found");

  return res.status(200).json({ success: true, data: client });
});

export const updateClient = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const client = await ClientModel.findById(req.params.id);
  if (!client) throw new ApiError(404, "Client not found");

  if (req.files?.logo?.[0]) {
    if (client?.logo && fs.existsSync(path.join(process.cwd(), client.logo))) {
      fs.unlinkSync(path.join(process.cwd(), client.logo));
    }
    client.logo = await compressImage(req.files.logo[0].buffer, "client");
  }

  client.status = typeof status === "boolean" ? status : client.status;
  client.updatedBy = req.user?._id;
  client.updatedAt = new Date();

  await client.save();

  return res.status(200).json({ success: true, message: "Updated Successfully", data: client });
});

export const deleteClient = asyncHandler(async (req, res) => {
  const client = await ClientModel.findById(req.params.id);
  if (!client) throw new ApiError(404, "Client not found");

  if (client?.logo && fs.existsSync(path.join(process.cwd(), client.logo))) {
    fs.unlinkSync(path.join(process.cwd(), client.logo));
  }

  await client.deleteOne();

  return res.status(200).json({ success: true, message: "Deleted successfully" });
});
