import Image from "next/image";
import background from "public/sean-oulashin-KMn4VEeEPR8-unsplash.jpg";

export default function PublicSitesLayout({
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
          alt="sean-oulashin-unsplash"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 overflow-auto">{children}</div>
      </div>
    </>
  );
}
