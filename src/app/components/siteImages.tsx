// import { CldImage } from "next-cloudinary";
import Image from "next/image";
import getBase64 from "@/app/utils/getBase64";

const SiteImages = async ({ url }) => {
  const myBlurDataUrl = await getBase64(url);
  return (
    <div className="relative w-[500px] h-[500px] overflow-hidden">
      <Image
        src={url}
        fill
        className="object-cover object-center rounded-xl"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        placeholder="blur"
        blurDataURL={myBlurDataUrl}
        alt="site image"
      />
    </div>
  );
};
export default SiteImages;
