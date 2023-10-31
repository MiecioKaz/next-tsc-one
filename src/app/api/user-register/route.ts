import { NextResponse } from "next/server";
import clientPromise from "@/app/utils/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const { name, email, password } = await request.json();
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await db.collection("users").insertOne({
      name,
      email,
      password: hashPassword,
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { message: "An error occured while registering the user." },
      { status: 500 }
    );
  }
}
