import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // try {
  const body = await request.json();
  const { imgData, siteId } = body;
  const { imgUrl, imgId } = imgData;
  console.log(imgData);
  console.log(siteId);

  const siteRes = await prisma.site.updateMany({
    where: {
      id: siteId,
    },
    data: {
      siteImgData: {
        push: { imgUrl, imgId },
      },
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
