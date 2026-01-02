import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const orders = await Order.find()
    .populate("items.productId");

  return NextResponse.json({ orders });
}
