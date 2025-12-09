import ShippingChargeModel from "../../models/shippingCharge.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";

/* --------------------- GET SINGLE SHIPPING CHARGE --------------------- */
export const getShippingChargeByState = asyncHandler(async (req, res) => {
  const state = req.params.state;
  const shippingCharge = await ShippingChargeModel.findOne({ state });

  if (!shippingCharge) {
    throw new ApiError(404, "Shipping charge not found for this state");
  };

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: shippingCharge,
  });
});