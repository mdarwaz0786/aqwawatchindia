const calculateTotalWithGST = (price = 0, quantity, gstPercent = 0) => {
  const basePrice = price * quantity;
  const gstAmount = (basePrice * gstPercent) / 100;
  return Number((basePrice + gstAmount).toFixed(2));
};

export default calculateTotalWithGST;
