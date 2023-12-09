import Image from "next/image";
import SelectRegion from "@/components/selectRegion";
import data from "@/json/italy.json";
import mapImage from "public/italy-regions-map.jpg";

const Search = () => {
  const regions = data;

  return (
    <>
      <div className="w-11/12 mx-auto mt-24">
        <h1 className="text-center text-2xl font-bold">
          Select Region and Province
        </h1>

        <div className="relative group w-[350px] h-[450px] md:w-[600px] md:h-[700px] mx-auto mt-20">
          <Image
            src={mapImage}
            // src="/italy-regions-map.jpg"
            fill
            sizes="33vw"
            priority
            // placeholder="blur"
            className=""
            alt="ontheworldmap.com-Italy"
          />

          <div className="absolute left-1/4 top-1 hidden group-hover:block w-1/2 z-10">
            <SelectRegion regions={regions} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Search;
