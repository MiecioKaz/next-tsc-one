import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // try {
  const body = await request.json();
  const { detailsSet, siteImgSet } = body;

  const res = await prisma.site.create({
    data: {
      ...detailsSet,
      siteImgData: { set: [...siteImgSet] },
    },
  });
  console.log(res);
  if (res) {
    return NextResponse.json({ statusText: "ok" }, { status: 200 });
  } else {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }

  // return Response.json(data);

  // } catch (e) {
  //   console.error(e);
  //   if (e instanceof Error) {
  //     throw new Error(e.message);
  //   }
  // }
}
