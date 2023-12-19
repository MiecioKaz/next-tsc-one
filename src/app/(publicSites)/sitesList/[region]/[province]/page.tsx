import Link from "next/link";
import prisma from "@/libs/prismadb";
import { Site } from "@/types/types";

const getSites = async (reg: string, prov: string) => {
  try {
    const sites = await prisma.site.findMany({
      where: {
        region: reg,
        province: prov,
      },
    });

    return sites;
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      return new Error(e.message);
    }
  }
};

const DisplayList = async ({
  params,
}: {
  params: { region: string; province: string };
}) => {
  const { region, province } = params;

  const sites: Array<Site> | Error | undefined = await getSites(
    region,
    province
  );

  if (sites && !(sites instanceof Error) && sites.length !== 0) {
    return (
      <>
        <div className="mt-44 w-2/3 mx-auto">
          <h2 className="text-center">
            Region:
            <span className="text-2xl font-bold"> {region}</span> _______
            Province:
            <span className="text-2xl font-bold"> {province}</span>
          </h2>
          <ul className="w-full space-y-3 mt-6">
            {sites.map((site) => (
              <Link
                href={`/siteDisplay/${site.id}`}
                scroll={false}
                className="hover:text-cyan-500"
                key={site.id}
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
        </div>
      </>
    );
  } else {
    return (
      <div className="mt-52 w-2/3 mx-auto text-center text-2xl text-red-600 font-semibold">
        No sites has been included yet for {province} province.
      </div>
    );
  }
};

export default DisplayList;
