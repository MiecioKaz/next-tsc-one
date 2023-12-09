import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { detailsSet, siteImgSet } = body;

    const site = await prisma.site.create({
      data: {
        ...detailsSet,
        siteImgData: { set: [...siteImgSet] },
      },
    });
    console.log(site);
    return NextResponse.json(site);
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      return new Error(e.message);
    }
  }
}
