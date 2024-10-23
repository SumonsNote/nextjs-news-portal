import { NextResponse } from "next/server";
import { NewsList } from "../../../../models/newslist-model";
import { dbConnect } from "../../../../services/mongo";

export async function POST(req) {
  try {
    await dbConnect();
    const reqObj = await req.json();
    const news = await NewsList.create(reqObj);
    return NextResponse.json({ status: "success", news });
  } catch (error) {
    return NextResponse.json({ status: "error", error: error.message });
  }
}
