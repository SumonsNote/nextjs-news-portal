import { NextResponse } from "next/server";
import { NewsList } from "../../../../models/newslist-model";
import { dbConnect } from "../../../../services/mongo";

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const news = await NewsList.find({ type }).select(
      "title short_des img1 img2 img3 img4"
    );
    return NextResponse.json({ status: "success", news });
  } catch (error) {
    return NextResponse.json({ status: "error", error: error.message });
  }
}
