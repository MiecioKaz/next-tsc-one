// import { CldImage } from "next-cloudinary";
import Image from "next/image";
import getBase64 from "@/utils/getBase64";

const SiteImages = async ({ url }: { url: string }) => {
  const myBlurDataUrl = await getBase64(url);
  return (
    <div className="p-6 bg-slate-200 overflow-hidden rounded-lg">
      <div className="relative w-[300px] sm:w-[400px] h-[300px] sm:h-[400px]">
        <Image
          src={url}
          fill
          className="object-contain object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={myBlurDataUrl}
          alt="site image"
        />
      </div>
    </div>
  );
};
export default SiteImages;
