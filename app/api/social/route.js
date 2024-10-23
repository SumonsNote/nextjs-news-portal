import { NextResponse } from "next/server";
import { Social } from "../../../models/social-model";
import { dbConnect } from "../../../services/mongo";

export async function POST(req) {
  try {
    await dbConnect();
    const reqObj = await req.json();

    const social = await Social.create(reqObj);
    return NextResponse.json({ status: "success", social });
  } catch (error) {
    return NextResponse.json({ status: "error", error: error.message });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const socials = await Social.find();
    return NextResponse.json({ status: "success", socials });
  } catch (error) {
    return NextResponse.json({ status: "error", error: error.message });
  }
}
