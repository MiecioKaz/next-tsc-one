import SiteImages from "@/app/components/siteImages";

import clientPromise from "@/app/utils/mongodb";
import { ObjectId } from "mongodb";

const getSite = async (siteId: string) => {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const site = await db.collection("sites").findOne({
      _id: new ObjectId(siteId),
    });

    return site;
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      return new Error(e.message);
    }
  }
};

const SiteDisplay = async ({ params }) => {
  const { siteId } = params;

  const site = await getSite(siteId);

  return (
    <>
      <div className="fixed top-0 w-full z-10 h-20 bg-orange-200"></div>

      {site && site.siteImgData.length !== 0 && (
        <div
          className="mt-40"
          tabIndex="0"
        >
          <div className="text-center text-xl w-1/3 mx-auto">
            <h1 className="text-3xl font-bold mb-4">{site.name}</h1>
            <h2>
              {site.province}-{site.region}
            </h2>
            <p>{site.address}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 w-11/12 mx-auto mt-6">
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
};
export default SiteDisplay;
