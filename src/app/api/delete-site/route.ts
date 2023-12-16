import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // try {
  const body = await request.json();
  const { siteId } = body;

  const siteRes = await prisma.site.delete({
    where: {
      id: siteId,
    },
  });
  console.log(siteRes);
  if (siteRes) {
    return NextResponse.json({ statusText: "ok" }, { status: 200 });
  } else {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
