import { connectDB } from "@/lib/db";
import Cart from "@/models/Cart";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { cart, customer, total } = await req.json();

  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    return NextResponse.json(
      { error: "Cart is empty" },
      { status: 400 }
    );
  }

  if (!customer?.name || !customer?.phone || !customer?.address) {
    return NextResponse.json(
      { error: "Missing customer details" },
      { status: 400 }
    );
  }

  await connectDB();

  // 🔥 Transform cart items to DB-friendly format
  const items = cart.map((item: any) => ({
    productId: item.product._id,
    quantity: item.quantity,
  }));

  const order = await Order.create({
    userId: customer.phone, // or any identifier you prefer
    items,
    customer: {
      name: customer.name,
      phone: customer.phone,
      email: customer.email || "",
      address: customer.address,
    },
    totalAmount: total,
    status: "PLACED",
    orderPlacedAt: new Date(),
  });

  return NextResponse.json({
    success: true,
    orderId: order._id,
  });
}
