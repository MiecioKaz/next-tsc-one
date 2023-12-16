import prisma from "@/libs/prismadb";

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
  //   return Response.json(siteRes);
  // } catch (e) {
  //   console.error(e);
  //   if (e instanceof Error) {
  //     return new Error(e.message);
  //   }
  // }
}
