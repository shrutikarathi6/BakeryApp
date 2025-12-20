import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Cart from "@/models/Cart";

export async function GET(req: Request) {
  const userId = req.headers.get("x-user-id");

  await connectDB();

  const cart = await Cart.findOne({ userId }).populate("items.productId");

  return NextResponse.json({
    items: cart?.items || [],
  });
}
