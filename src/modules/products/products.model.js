import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema(
  {
    size: {type: String,required: true},
    price: {type: Number},
    // stock: {type: Number,required: true,min: 0,},
    status: {type: String,enum: ["active", "out_of_stock"],default: "active",},},
  { _id: false },
);

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true, trim: true, maxlength: 50 },
    productDesc: { type: String, required: true, trim: true, maxlength: 200 },
    price: { type: Number, required: true, min: 0 },
    sizes: [sizeSchema]
  },
  {
    timestamps: true,
  },
);

export const Product = mongoose.model("product", productSchema);
