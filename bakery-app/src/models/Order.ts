import mongoose, { Schema, models } from "mongoose";

const OrderSchema = new Schema(
  {
    userId: { type: String, required: true },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
      },
    ],

    customer: {
      name: String,
      phone: String,
      email: String,
      address: String,
    },

    totalAmount: Number,

    status: {
      type: String,
      enum: ["PLACED", "ACCEPTED", "PREPARED"],
      default: "PLACED",
    },

    orderPlacedAt: { type: Date, default: Date.now },
    orderPreparedAt: { type: Date },
  },
  { timestamps: true }
);

export default models.Order || mongoose.model("Order", OrderSchema);
