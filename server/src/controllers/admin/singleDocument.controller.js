import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";

export const singleDocumentController = (Model) => ({

  // -------- CREATE / UPDATE (ONLY ONE DOCUMENT) --------
  createOrUpdate: asyncHandler(async (req, res) => {
    const { title, description, status } = req.body;

    let record = await Model.findOne();

    if (!record) {
      // Create first document
      record = await Model.create({
        title,
        description,
        status,
        createdBy: req.user?._id,
      });
    } else {
      // Update existing document
      if (title) record.title = title;
      if (description) record.description = description;
      if (status !== undefined) record.status = status;
      record.updatedBy = req.user?._id;
      record.updatedAt = new Date();

      await record.save();
    }

    return res.status(200).json({
      success: true,
      message: "Saved successfully",
      data: record,
    });
  }),

  // -------- FETCH DOCUMENT --------
  get: asyncHandler(async (req, res) => {
    const record = await Model.findOne();

    if (!record) throw new ApiError(404, "Data not found");

    return res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: record,
    });
  }),

  // -------- DELETE DOCUMENT --------
  delete: asyncHandler(async (req, res) => {
    const record = await Model.findOne();
    if (!record) throw new ApiError(404, "No document found");

    await record.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  }),
});
