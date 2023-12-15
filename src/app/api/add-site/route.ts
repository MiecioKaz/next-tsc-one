import prisma from "@/libs/prismadb";

export async function POST(request: Request): Promise<any> {
  // try {
  const body = await request.json();
  const { detailsSet, siteImgSet } = body;

  const data = await prisma.site.create({
    data: {
      ...detailsSet,
      siteImgData: { set: [...siteImgSet] },
    },
  });

  if (data) {
    return Response.json(data);
  } else {
    throw new Error("Site creation failed");
  }
  // } catch (e) {
  //   console.error(e);
  //   if (e instanceof Error) {
  //     throw new Error(e.message);
  //   }
  // }
}
