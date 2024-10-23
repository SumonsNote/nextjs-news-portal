import { NextResponse } from "next/server";
import { Policy } from "../../../models/policy-model";
import { dbConnect } from "../../../services/mongo";

export async function POST(req) {
  try {
    await dbConnect();
    const reqObj = await req.json();
    const policy = await Policy.create(reqObj);
    return NextResponse.json({ status: "success", policy });
  } catch (error) {
    return NextResponse.json({ status: "error", error: error.message });
  }
}

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const policies = await Policy.find({ type });
    return NextResponse.json({ status: "success", policies });
  } catch (error) {
    return NextResponse.json({ status: "error", error: error.message });
  }
}
