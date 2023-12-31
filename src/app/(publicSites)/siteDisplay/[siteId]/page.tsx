import SiteImages from "@/components/siteImages";
import prisma from "@/libs/prismadb";
import { Site } from "@/types/types";

const getSite = async (siteId: string) => {
  try {
    const site = await prisma.site.findUnique({
      where: {
        id: siteId,
      },
    });

    return site;
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      return new Error(e.message);
    }
  }
};

const SiteDisplay = async ({ params }: { params: { siteId: string } }) => {
  const { siteId } = params;

  const site: Site | null | undefined | Error = await getSite(siteId);

  if (site) {
    return (
      <>
        {/* <div className="fixed top-0 w-full bg-gradient-to-l from-gray-100 to-teal-300 z-10 h-20"></div> */}

        {!(site instanceof Error) && site.siteImgData.length !== 0 && (
          <div
            className="relative mt-40"
            tabIndex={0}
          >
            <div className="flex flex-wrap justify-center gap-4 w-11/12 mx-auto my-6">
              {site.siteImgData.map((imgData) => (
                <SiteImages
                  key={imgData.imgId}
                  url={imgData.imgUrl}
                />
              ))}
            </div>
          </div>
        )}
      </>
    );
  }
};
export default SiteDisplay;
