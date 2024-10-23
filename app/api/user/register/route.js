import { User } from "../../../../models/user-model";
import { dbConnect } from "../../../../services/mongo";

import { NextResponse } from "next/server";

export const POST = async (req) => {
  const {
    firstName,
    lastName,
    mobile,
    email,
    password,
    otp = "0",
  } = await req.json();

  await dbConnect();

  const newUser = {
    firstName,
    lastName,
    email,
    password,
    mobile,
    otp,
  };

  try {
    await User.create(newUser);
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(error.message, {
      status: 500,
    });
  }
};
