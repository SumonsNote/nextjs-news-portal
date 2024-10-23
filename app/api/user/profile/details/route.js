import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { User } from "../../../../../models/user-model";
import { dbConnect } from "../../../../../services/mongo";

export async function GET(req) {
  try {
    await dbConnect();
    const headerList = headers();
    const userId = headerList.get("id");

    const user = await User.findById(userId);

    return NextResponse.json(
      { status: "success", message: "User authenticated", user: user },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { status: "fail", message: "Internal server error" },
      { status: 500 }
    );
  }
}
