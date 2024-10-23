import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function middleware(req, res) {
  try {
    let token = req.cookies.get("next-news-portal");

    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

    const { payload } = await jwtVerify(token.value, secretKey);

    const requestHeader = new Headers(req.headers);
    requestHeader.set("email", payload.userEmail);
    requestHeader.set("id", payload.userId);
    return NextResponse.next({ request: { headers: requestHeader } });
  } catch (e) {
    const requestHeader = new Headers(req.headers);
    requestHeader.set("email", "");
    requestHeader.set("id", "");
    return NextResponse.next({ request: { headers: requestHeader } });
  }
}
