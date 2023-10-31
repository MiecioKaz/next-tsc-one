import Link from "next/link";
import clientPromise from "@/app/utils/mongodb";

const getSites = async (reg, prov) => {
  try {
    const client = await clientPromise;
    const db = client.db("bel-hol-sites");

    const sites = await db
      .collection("sites")
      .find({ $and: [{ region: { $eq: reg } }, { province: { $eq: prov } }] })
      .toArray();

    return sites;
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      return new Error(e.message);
    }
  }
};

const DisplayList = async ({ params }) => {
  const { region, province } = params;

  const sites = await getSites(region, province);

  return (
    <>
      <div className="fixed top-0 w-full z-10 h-20 bg-orange-200"></div>
      <div className="mt-32 w-2/3 mx-auto">
        <h2 className="text-center">
          Region:
          <span className="text-2xl font-bold"> {region}</span> _______
          Province:
          <span className="text-2xl font-bold"> {province}</span>
        </h2>
        {sites.length !== 0 && (
          <ul className="w-full space-y-3 mt-6">
            {sites.map((site, index) => (
              <Link
                href={`/publicSites/siteDisplay/${site._id}`}
                className="hover:text-cyan-500"
                key={site._id}
              >
                <li className="w-full border-2 py-6 bg-white">
                  <div className="w-10/12 mx-auto text-center">
                    <h2 className="">
                      Name:
                      <span className="text-xl font-bold"> {site.name}</span>
                    </h2>
                    <p className="">
                      Address:
                      <span className="text-lg font-medium">
                        {" "}
                        {site.address}
                      </span>
                    </p>

                    <p className="">
                      Description:
                      <span className="text-lg font-medium">
                        {" "}
                        {site.description}
                      </span>
                    </p>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default DisplayList;
