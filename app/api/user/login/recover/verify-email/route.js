import { NextResponse } from "next/server.js";
import { User } from "../../../../../../models/user-model.js";
import { dbConnect } from "../../../../../../services/mongo.js";
import { sendEmail } from "../../../../../../utils/email";

export const GET = async (req, res) => {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    const user = await User.findOne({ email });

    if (user) {
      const code = Math.floor(1000 + Math.random() * 9000);
      const emailText = `News Portal Verification Code = ${code}`;
      const emailSubject = "Next News Portal Verification Code";
      await sendEmail(email, emailText, emailSubject);

      const result = await User.findOneAndUpdate(
        { email: email },
        { otp: code.toString() },
        { new: true }
      );
      return NextResponse.json({ status: "success", data: result });
    } else {
      return NextResponse.json({ status: "fail", data: "No user found" });
    }
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error });
  }
};
