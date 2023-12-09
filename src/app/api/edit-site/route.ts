import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { detailsSet, siteId } = body;

    const siteRes = await prisma.site.updateMany({
      where: {
        id: siteId,
      },
      data: {
        ...detailsSet,
      },
    });
    console.log(siteRes);
    return NextResponse.json(siteRes);
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      return new Error(e.message);
    }
  }
}
