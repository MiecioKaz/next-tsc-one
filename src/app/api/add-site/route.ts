import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { detailsSet, siteImgSet } = body;

    const data = await prisma.site.create({
      data: {
        ...detailsSet,
        siteImgData: { set: [...siteImgSet] },
      },
    });

    return Response.json(data);
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      return new Error(e.message);
    }
  }
}
