import { connectDB } from "@/lib/db";
import Cart from "@/models/Cart";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, customer,total } = await req.json();

  await connectDB();

  const cart = await Cart.findOne({ userId });

  if (!cart || cart.items.length === 0) {
    return NextResponse.json(
      { error: "Cart is empty" },
      { status: 400 }
    );
  }


  const order = await Order.create({
    userId,
    items: cart.items,
    customer,
    totalAmount: total,
  });

  // Clear cart after order placed
  cart.items = [];
  await cart.save();

  return NextResponse.json({
    success: true,
    orderId: order._id,
  });
}
