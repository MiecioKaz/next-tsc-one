import "./globals.css";
// import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Outfit, Roboto_Mono } from "next/font/google";
import NavLink from "../components/navLink";
import Link from "next/link";
import UserLinks from "../components/userLinks";
import { NextAuthProvider } from "../providers";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

// const inter = Inter({ subsets: ["latin"] });
const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});
const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "Bel Site",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html
      className={`${outfit.variable} ${roboto_mono.variable}`}
      lang="en"
    >
      <body className="bg-slate-100 font-sans">
        <NextAuthProvider>
          <header>
            <nav className="fixed top-0 z-20 w-full flex items-center bg-transparent text-violet-800 font-bold h-20 pr-10">
              <div className="w-1/3 pl-10">
                <Link
                  href="/"
                  className="font-bold text-3xl text-green-900 hover:text-yellow-800"
                >
                  Bel-Sites
                </Link>
              </div>
              <div className="flex justify-evenly items-center w-2/3 text-lg">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/search">Sites</NavLink>
                <UserLinks />
                {/* {session && session.user !== undefined && (
                    <h1>Hi {session.user.name}</h1>
                  )} */}
              </div>
            </nav>
          </header>

          <main className="">{children}</main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
