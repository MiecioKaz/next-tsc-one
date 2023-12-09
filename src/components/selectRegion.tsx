import Link from "next/link";

const SelectRegion = ({ regions }: { regions: Record<string, string[]> }) => {
  return (
    <ul className="relative text-center w-full space-y-2 text-xl">
      {Object.keys(regions).map((region, index) => (
        <li
          key={index}
          className="relative group/province w-full h-fit bg-white hover:text-red-500"
          tabIndex={0}
        >
          {region}

          <ul className="absolute hidden group-focus-within/province:block w-full border-2 z-10 bg-green-400">
            {regions[region].map((province: string, index: number) => (
              <li
                key={index}
                className=""
              >
                <Link
                  href={`/sitesList/${region}/${province}`}
                  scroll={false}
                >
                  <div className="w-full h-fit text-white hover:text-red-500">
                    {province}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};
export default SelectRegion;
