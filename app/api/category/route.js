import { NextResponse } from "next/server";
import { Category } from "../../../models/category-model";
import { dbConnect } from "../../../services/mongo";

export async function POST(req) {
  try {
    await dbConnect();
    const reqObj = await req.json();
    const category = await Category.create(reqObj);
    return NextResponse.json({ status: "success", category });
  } catch (error) {
    return NextResponse.json({ status: "error", error: error.message });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const categories = await Category.find().select("name");
    return NextResponse.json({ status: "success", categories });
  } catch (error) {
    return NextResponse.json({ status: "error", error: error.message });
  }
}
