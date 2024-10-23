import * as jose from "jose";
import { NextResponse } from "next/server";
import { User } from "../../../../models/user-model";
import { dbConnect } from "../../../../services/mongo";

export async function POST(req, res) {
  try {
    await dbConnect();
    let reqBody = await req.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });

    const userEmail = user.email;
    const userId = user._id.toString();

    if (!user) {
      return NextResponse.json(
        { status: "fail", message: "User not found" },
        { status: 404 }
      );
    } else {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
      const token = await new jose.SignJWT({
        email: userEmail,
        userId: userId,
      })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("24h")
        .sign(secret);

      const expireDuration = new Date(Date.now() + 24 * 60 * 60 * 1000);

      const cookieString = `${process.env.COOKIE_NAME}=${token}; HttpOnly; Secure; expires=${expireDuration}; Path=/;`;

      return NextResponse.json(
        { status: "success", data: token },
        { status: 200, headers: { "set-cookie": cookieString } }
      );
    }
  } catch (e) {
    return NextResponse.json(
      { status: "fail", data: e.message },
      { status: 500 }
    );
  }
}
