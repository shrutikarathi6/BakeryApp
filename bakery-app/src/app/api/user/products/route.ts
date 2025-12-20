import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  await connectDB();

  const filter = category ? { category } : {};
  console.log("Filter applied:", filter);
  const products = await Product.find(filter).sort({ createdAt: -1 });
  console.log("Products fetched:", products.length);

  return NextResponse.json({ success: true, products });
}
