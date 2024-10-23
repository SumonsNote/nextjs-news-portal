import { NextResponse } from "next/server";
import { Subscriber } from "../../../models/subscriber-model";
import { dbConnect } from "../../../services/mongo";

export async function POST(req) {
  try {
    await dbConnect();
    const reqObj = await req.json();
    const subscriber = await Subscriber.create(reqObj);
    return NextResponse.json({ status: "success", subscriber });
  } catch (error) {
    return NextResponse.json({ status: "error", error: error.message });
  }
}
