import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    phone: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ["USER", "CHEF", "ADMIN"],
      default: "USER",
    },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.User || model("User", UserSchema);
