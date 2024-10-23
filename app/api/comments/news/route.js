import { NextResponse } from "next/server";
import { Comment } from "../../../../models/commnet-model";
import { User } from "../../../../models/user-model";
import { dbConnect } from "../../../../services/mongo";

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("postID");
    const comments = await Comment.find({ postID: id }).populate({
      path: "userID",
      model: User,
      select: "firstName lastName -_id",
    });

    return NextResponse.json({ status: "success", comments });
  } catch (error) {
    return NextResponse.json({ status: "error", error: error.message });
  }
}
