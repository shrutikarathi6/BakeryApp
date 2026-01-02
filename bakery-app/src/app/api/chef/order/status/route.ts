import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function PATCH(req: Request) {
  const { orderId, action } = await req.json();


  if (!orderId || !action) {
    return NextResponse.json(
      { error: "Missing orderId or action" },
      { status: 400 }
    );
  }

  await connectDB();

  const update: any = {};

  if (action === "ACCEPT") {
    update.status = "ACCEPTED";
  }

  if (action === "REJECT") {
    update.status = "REJECTED";
  }

  if (action === "PREPARED") {
    update.status = "PREPARED";
    update.orderPreparedAt = new Date();
  }

  if( action === "DELIVERED") {
    update.status = "DELIVERED";
    update.orderDeliveredAt = new Date();
  }

  const order = await Order.findByIdAndUpdate(orderId, update, {
    new: true,
  });



  if (!order) {
    return NextResponse.json(
      { error: "Order not found" },
      { status: 404 }
    );
  }

   const io = (global as any).io;

  if (action === "PREPARED" && io) {
    io.emit("order-prepared", {
      orderId: order._id,
      status: "PREPARED",
      preparedAt: order.orderPreparedAt,
      message: `Order #${order._id.slice(-6)} is ready for pickup!`,
    });

    console.log("📣 order-prepared emitted");
  }

  return NextResponse.json({
    success: true,
    status: order.status,
  });
}
