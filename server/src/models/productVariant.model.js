import mongoose from "mongoose";

const productVariantSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    default: null,
    index: true,
  },
  color: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Color",
    default: null,
    index: true,
  },
  size: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Size",
    default: null,
    index: true,
  },
  skuCode: {
    type: String,
    trim: true,
    unique: true,
  },
  mrpPrice: {
    type: Number,
    default: 0,
  },
  salePrice: {
    type: Number,
    default: 0,
  },
  percentOff: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    default: 0,
  },
  images: [{
    type: String,
    trim: true,
  }],
});

productVariantSchema.pre("save", function (next) {
  if (this.mrpPrice && this.salePrice) {
    const discount = ((this.mrpPrice - this.salePrice) / this.mrpPrice) * 100;
    this.percentOff = Math.round(discount);
  } else {
    this.percentOff = 0;
  };
  next();
});

const ProductVariantModel = mongoose.model("ProductVariant", productVariantSchema);

export default ProductVariantModel;