"use client";

import { useState } from "react";
import EditSiteForm from "./editSiteForm";
import { Site } from "@/types/types";

const MySites = ({ sites }: { sites: Site[] }) => {
  console.log(sites);
  const [siteIndex, setSiteIndex] = useState(-1);

  return (
    <>
      <ul className="w-1/2 mx-auto mb-4 text-center">
        {sites.map((site: Site, index: number) => (
          <li
            key={site.id}
            className="border-2 rounded-md border-slate-300 bg-slate-100 mt-2"
          >
            <h1
              className="text-xl cursor-pointer hover:text-orange-500"
              onClick={() => setSiteIndex(index)}
            >
              {site.name}
            </h1>
            <p>{site.address}</p>
          </li>
        ))}
      </ul>
      {/* )} */}
      {siteIndex !== -1 && (
        <EditSiteForm
          key={sites[siteIndex].id}
          site={sites[siteIndex]}
        />
      )}
    </>
  );
};
export default MySites;
