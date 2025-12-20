import mongoose, { Schema, models } from "mongoose";
export const PRODUCT_CATEGORIES = [
  "Cake",
  "Bread",
  "Pastry",
  "Cookies",
  "Donuts",
] as const;
const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
     category: {
      type: String,
      enum: PRODUCT_CATEGORIES,
      required: true,
    },
    price: { type: Number, required: true },

    // Image stored as Base64 (DEV PURPOSE)
    image: { type: String, required: true },

    createdBy: { type: String, default: "ADMIN" },
  },
  { timestamps: true }
);

export default models.Product || mongoose.model("Product", ProductSchema);
