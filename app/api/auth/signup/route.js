import { hashPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { db } = await connectToDatabase();
  const userCollection = db.collection("user");
  const body = await request.json();

  const { email, password } = body;
  if (password.trim().length < 7) {
    return NextResponse.json(
      { error: "you need to input a stronger password" },
      { status: 422 },
    );
  }
  if (
    !email ||
    !password ||
    !email.includes("@")
  ) {
    return NextResponse.json({ error: "invalid inputs" }, { status: 422 });
  }
  const existingUser = await userCollection.findOne({email: email})
  if(existingUser) {
    return NextResponse.json(
      { error: "another user with this email exists." },
      { status: 422 },
    );
  }
  const hashedPass = await hashPassword(password);

  const result = await userCollection.insertOne({
    email: email,
    password: hashedPass,
  });

  return NextResponse.json(
    { message: "successfully signed up", result },
    { status: 201 },
  );
}
