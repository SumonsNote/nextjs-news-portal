import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { User } from "../../../../../models/user-model";
import { dbConnect } from "../../../../../services/mongo";

export async function PUT(req) {
  try {
    await dbConnect();

    const headerList = headers();
    const userId = headerList.get("id");

    if (!userId) {
      return NextResponse.json(
        { status: "Failed", message: "User ID is required" },
        { status: 400 }
      );
    }

    const reqObj = await req.json();

    const user = await User.findByIdAndUpdate(userId, reqObj, { new: true });

    if (!user) {
      return NextResponse.json(
        { status: "fail", message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: "success",
      message: "User updated successfully",
      user: user,
    });
  } catch (e) {
    return NextResponse.json(
      { status: "fail", message: "Internal server error", error: e.message },
      { status: 500 }
    );
  }
}
