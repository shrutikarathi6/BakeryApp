import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const { orderId } = await req.json();

  await connectDB();

  await Order.findByIdAndUpdate(orderId, {
    status: "PREPARED",
    orderPreparedAt: new Date(),
  });

  return NextResponse.json({ success: true });
}
