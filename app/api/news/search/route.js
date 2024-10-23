import { NextResponse } from "next/server";
import { NewsList } from "../../../../models/newslist-model";
import { dbConnect } from "../../../../services/mongo";

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const searchRegex = { $regex: search, $options: "i" };
    const news = await NewsList.find({
      $or: [
        { title: searchRegex },
        { short_des: searchRegex },
        { long_des: searchRegex },
        { keywords: searchRegex },
        { type: searchRegex },
      ],
    }).select("title short_des img1 img2 img3 img4");
    return NextResponse.json({ status: "success", news });
  } catch (error) {
    return NextResponse.json({ status: "error", error: error.message });
  }
}
