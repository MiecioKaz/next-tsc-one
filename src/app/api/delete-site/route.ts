import prisma from "@/libs/prismadb";

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
  //   return Response.json(siteRes);
  // } catch (e) {
  //   console.error(e);
  //   if (e instanceof Error) {
  //     return new Error(e.message);
  //   }
  // }
}
