import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    index: true,
    required: [true, "category is required"]
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    index: true,
    default: null,
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
    default: null,
    index: true,
  },
  name: {
    type: String,
    required: [true, "name is required"],
    trim: true,
  },
  slug: {
    type: String,
    trim: true,
  },
  skuCode: {
    type: String,
    trim: true,
    unique: true,
  },
  rating: {
    type: Number,
    trim: true,
    default: 0,
  },
  numberOfReviews: {
    type: Number,
    trim: true,
    default: 0,
  },
  mrpPrice: {
    type: Number,
    trim: true,
  },
  salePrice: {
    type: Number,
    trim: true,
  },
  percentOff: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    trim: true,
    default: 0,
  },
  bestSellingProduct: {
    type: Boolean,
    default: false,
  },
  newArrivalProduct: {
    type: Boolean,
    default: false,
  },
  smallInfo: {
    type: String,
  },
  description: {
    type: String,
  },
  specification: {
    type: String,
  },
  amazonLink: {
    type: String,
  },
  flipKartLink: {
    type: String,
  },
  youtubeVideoLink: {
    type: String,
  },
  images: [{
    type: String,
    required: [true, "images are required"],
  }],
  status: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
}, { timestamps: true });

productSchema.index({ name: "text" });

productSchema.pre("save", function (next) {
  if (this.mrpPrice && this.salePrice) {
    const discount = ((this.mrpPrice - this.salePrice) / this.mrpPrice) * 100;
    this.percentOff = Math.round(discount);
  } else {
    this.percentOff = 0;
  };
  next();
});

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;