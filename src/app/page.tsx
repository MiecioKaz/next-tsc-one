import Link from "next/link";
import Image from "next/image";
import frontImage from "public/luca-bravo-Yq9MFJpafAg-unsplash.jpg";

// import getBase64static from "../lib/getBase64static";

export default async function Home() {
  // const myBlurDataUrl = await getBase64static(
  //   `${process.env.URL}/public/images/luca-bravo-Yq9MFJpafAg-unsplash.jpg`
  // );

  return (
    <div className="relative w-screen h-screen">
      <Image
        src={frontImage}
        fill
        // placeholder="blur"
        // blurDataURL={myBlurDataUrl}
        className="object-cover object-center"
        alt="Photo by Luca Bravo on Unsplash"
      />
      <div className="absolute top-1/2 left-1/2 pt-16 -translate-x-1/2 text-center text-2xl text-white  bg-transparent">
        <h1 className="mb-2 font-bold font-mono">Welcome to Bel-Sites</h1>
        <h2>Jump right in and explore our many holiday sites</h2>
        <h2>Feel free to share some of your own</h2>
      </div>
      <div className="absolute top-3/4 left-1/2 -translate-x-1/2 text-white  bg-transparent border-2 rounded-xl hover:border-yellow-500 text-xl p-2">
        <Link href="/search">Search Sites</Link>
      </div>
    </div>
  );
}
