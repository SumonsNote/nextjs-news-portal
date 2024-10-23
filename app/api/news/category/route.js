import { NextResponse } from "next/server";
import { NewsList } from "../../../../models/newslist-model";
import { dbConnect } from "../../../../services/mongo";

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const catID = searchParams.get("catID");
    const categories = await NewsList.find({ catID }).select(
      "title short_des img1 img2 img3 img4"
    );
    return NextResponse.json({ status: "success", categories });
  } catch (error) {
    return NextResponse.json({ status: "error", error: error.message });
  }
}
