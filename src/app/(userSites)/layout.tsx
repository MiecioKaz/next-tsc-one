import Image from "next/image";
import background from "public/anthony-cantin-ig-lw0Dtz34-unsplash.jpg";

export default function UserSitesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="relative w-screen h-screen">
        <Image
          src={background}
          fill
          alt="Photo by Anthony Cantin on Unsplash"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 overflow-auto">{children}</div>
      </div>
    </>
  );
}
