import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Cart from "@/models/Cart";

export async function POST(req: Request) {
  const { userId, productId } = await req.json();

  await connectDB();

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({
      userId,
      items: [{ productId, quantity: 1 }],
    });
  } else {
    const item = cart.items.find(
      (i: any) => i.productId.toString() === productId
    );

    if (item) item.quantity += 1;
    else cart.items.push({ productId, quantity: 1 });

    await cart.save();
  }

  return NextResponse.json({ success: true });
}
