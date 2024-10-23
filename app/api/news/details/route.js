import { NextResponse } from "next/server";
import { NewsList } from "../../../../models/newslist-model";
import { dbConnect } from "../../../../services/mongo";

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const news = await NewsList.findById(id).populate("catID");

    return NextResponse.json({ status: "success", news });
  } catch (error) {
    return NextResponse.json({ status: "error", error: error.message });
  }
}
