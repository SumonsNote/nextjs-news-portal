import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Comment } from "../../../../models/commnet-model";
import { NewsList } from "../../../../models/newslist-model";
import { dbConnect } from "../../../../services/mongo";

export async function POST(req) {
  try {
    await dbConnect();
    const headerList = headers();
    const id = headerList.get("id");

    const reqObj = await req.json();
    reqObj.userID = id;
    const comments = await Comment.create(reqObj);
    return NextResponse.json({ status: "success", comments });
  } catch (error) {
    return NextResponse.json({ status: "error", error: error.message });
  }
}

export async function PUT(req) {
  try {
    await dbConnect();
    const headerList = headers();
    const id = headerList.get("id");

    const reqObj = await req.json();

    const { searchParams } = new URL(req.url);
    const commentId = searchParams.get("commentId");

    const { description } = reqObj;

    const updateComment = await Comment.findOneAndUpdate(
      { _id: commentId, userID: id },
      {
        $set: {
          description,
        },
      },
      { new: true }
    );

    return NextResponse.json({ status: "success", updateComment });
  } catch (error) {
    return NextResponse.json(
      { status: "error", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await dbConnect();
    const headerList = headers();
    const id = headerList.get("id");

    const comments = await Comment.find({ userID: id }).populate({
      path: "postID",
      model: NewsList,
      select: "title -_id",
    });

    return NextResponse.json({ status: "success", comments });
  } catch (error) {
    return NextResponse.json({ status: "error", error: error.message });
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();
    const headerList = headers();
    const id = headerList.get("id");

    const reqObj = await req.json();
    const commentId = reqObj.commentId;

    const deleteComment = await Comment.findByIdAndDelete({
      _id: commentId,
      userId: id,
    });
    return NextResponse.json({ status: "Successfully Deleted", deleteComment });
  } catch (error) {
    return NextResponse.json({ status: "error", error: error.message });
  }
}
