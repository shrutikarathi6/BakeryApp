import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const orders = await Order.find({ status: "PREPARED" })
    .populate("items.productId")
    .sort({ orderPreparedAt: -1 });

  return NextResponse.json({ orders });
}
