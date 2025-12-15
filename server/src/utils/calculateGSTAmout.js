export const calculateGSTAmount = (price = 0, quantity, gstPercent = 0) => {
  const baseAmount = price * quantity;
  return +(baseAmount * gstPercent / 100).toFixed(2);
};

export default calculateGSTAmount;