import prisma from "@/libs/prismadb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // try {
  const body = await request.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    throw new Error("Missing fields");
  }

  const exist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (exist) {
    return NextResponse.json(
      { statusText: "Email already exists" },
      { status: 400 }
    );
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });
    console.log(user);
    if (user) {
      return NextResponse.json({ statusText: "ok" }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}
