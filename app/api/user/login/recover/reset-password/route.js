import { NextResponse } from "next/server";
import { User } from "../../../../../../models/user-model";
import { dbConnect } from "../../../../../../services/mongo";

export const POST = async (req) => {
  try {
    await dbConnect();
    const reqObj = await req.json();
    const { email, otp, password } = reqObj;

    const user = await User.findOne({ email, otp });

    if (user) {
      await User.findOneAndUpdate(
        { email: email },
        { otp: "0", password },
        { new: true }
      );
      return NextResponse.json({
        status: "success",
        data: "Password successfully reset",
      });
    } else {
      return NextResponse.json({
        status: "fail",
        data: "Password reset failed",
      });
    }
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e.message });
  }
};
