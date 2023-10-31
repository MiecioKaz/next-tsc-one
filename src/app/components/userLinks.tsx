"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { ImUsers } from "react-icons/im";
import { useSession } from "next-auth/react";

export default function UserLinks() {
  const { data: session } = useSession();

  return (
    <div
      tabIndex={10}
      className="relative group w-10"
    >
      <ImUsers className="mx-auto hover:text-yellow-600 cursor-pointer" />

      <div className="absolute -right-20 top-6 hidden group-hover:block w-[500px] h-26 bg-gray-400 border rounded-md text-center py-2">
        {session ? (
          <h1 className="font-bold text-xl text-white">
            Hello {session.user.name}!
          </h1>
        ) : (
          <span className="font-normal text-sm text-red-500">
            Signup or Login if you want to create new site or edit existing one
          </span>
        )}

        <hr className="border my-2 mx-2" />
        <div className="flex justify-around text-white">
          {session && (
            <>
              <Link
                className="hover:text-yellow-300"
                href="/editSite"
              >
                My Sites
              </Link>
              <Link
                className="hover:text-yellow-300"
                href="/newSite"
              >
                New Site
              </Link>
            </>
          )}
          {!session && (
            <>
              <Link
                className="hover:text-yellow-300"
                href="/auth/signup"
              >
                Signup
              </Link>
              <Link
                className="hover:text-yellow-300"
                href="/auth/login"
              >
                Login
              </Link>
            </>
          )}
          {session && (
            <button
              type="button"
              className="hover:text-yellow-300"
              onClick={() => signOut()}
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
