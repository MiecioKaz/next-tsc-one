import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // try {
  const body = await request.json();
  const { detailsSet, siteImgSet } = body;

  const siteRes = await prisma.site.create({
    data: {
      ...detailsSet,
      siteImgData: { set: [...siteImgSet] },
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
