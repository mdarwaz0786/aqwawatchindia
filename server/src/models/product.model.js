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
  subSubCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubSubCategory",
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
  thumbImage: {
    type: String,
    required: true,
    trim: true,
  },
  thumbMrpPrice: {
    type: Number,
    required: true,
    trim: true,
  },
  thumbSalePrice: {
    type: Number,
    required: true,
    trim: true,
  },
  thumbPercentOff: {
    type: Number,
    default: 0,
  },
  thumbStock: {
    type: Number,
    trim: true,
    default: 0,
  },
  featuredProduct: {
    type: Boolean,
    default: false,
  },
  bestSellingProduct: {
    type: Boolean,
    default: false,
  },
  specialProduct: {
    type: Boolean,
    default: false,
  },
  newArrivalProduct: {
    type: Boolean,
    default: false,
  },
  topRatedProduct: {
    type: Boolean,
    default: false,
  },
  dealsOfDayProduct: {
    type: Boolean,
    default: false,
  },
  trendingProduct: {
    type: Boolean,
    default: false,
  },
  ourBestProduct: {
    type: Boolean,
    default: false,
  },
  smallInfo: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  specification: {
    type: String,
    required: false,
  },
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
  if (this.thumbMrpPrice && this.thumbSalePrice) {
    const discount = ((this.thumbMrpPrice - this.thumbSalePrice) / this.thumbMrpPrice) * 100;
    this.thumbPercentOff = Math.round(discount);
  } else {
    this.thumbPercentOff = 0;
  };
  next();
});

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;