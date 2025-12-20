import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, category, price, image } = body;

    if (!name || !category || !price || !image) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    const product = await Product.create({
      name,
      description,
      category,
      price,
      image,
    });

    console.log("product is :", product);

    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
