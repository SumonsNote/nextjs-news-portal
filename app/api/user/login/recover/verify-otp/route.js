import { NextResponse } from "next/server";
import { User } from "../../../../../../models/user-model";
import { dbConnect } from "../../../../../../services/mongo";

export const POST = async (req) => {
  try {
    await dbConnect();
    const reqObj = await req.json();
    const { email, otp } = reqObj;

    const user = await User.findOne({ email, otp });

    if (user) {
      return NextResponse.json({ status: "success", data: "Valid OTP Code" });
    } else {
      return NextResponse.json({ status: "fail", data: "Invalid OTP Code" });
    }
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e.message });
  }
};
