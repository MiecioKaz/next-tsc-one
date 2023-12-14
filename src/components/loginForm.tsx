"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function LoginForm() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const loginUser = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    signIn("credentials", {
      ...formValues,
      redirect: false,
    })
      .then((res) => {
        console.log(res);
        if (res && res.ok) {
          toast.success("User has been logged in");
          setLoading(false);
          setFormValues({ email: "", password: "" });
        } else {
          if (res && res.error) {
            setLoading(false);
            setFormValues({ email: "", password: "" });
            setError(res.error);
          }
        }
      })
      .catch((error) => {
        console.error(error.message);
        setLoading(false);
        setFormValues({ email: "", password: "" });
        setError(error.message);
      });
  };

  return (
    <div className="grid place-items-center">
      <div className="shadow-lg mt-48 p-5 rounded-lg bg-slate-100 border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Login</h1>

        <form
          onSubmit={loginUser}
          className="flex flex-col gap-3"
        >
          <input
            required
            type="email"
            name="email"
            onChange={(e) =>
              setFormValues({ ...formValues, email: e.target.value })
            }
            value={formValues.email}
            placeholder="Email Address"
            className="w-[300px] sm:w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40"
          />
          <input
            required
            type="password"
            name="password"
            onChange={(e) =>
              setFormValues({ ...formValues, password: e.target.value })
            }
            value={formValues.password}
            placeholder="Password"
            className="w-[300px] sm:w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40"
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-400 text-white font-bold cursor-pointer px-6 py-2"
            disabled={loading}
          >
            {loading ? "loading..." : "Login"}
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link
            className="text-sm mt-3 text-right"
            href="/userAuth/signup"
          >
            Do not have an account? <span className="underline">Register</span>
          </Link>
        </form>
      </div>

      {session?.user && (
        <div className="text-center shadow-lg mt-20 p-5 rounded-lg border-t-4 border-green-400">
          <h1 className="text-lg font-bold">
            Hello {session.user.name}! You are logged in.
          </h1>
          <Link href="/newSite">
            <div className="w-[300px] sm:w-[400px] bg-green-600 hover:bg-green-400 text-white font-bold cursor-pointer my-4 px-6 py-2">
              Create New Site
            </div>
          </Link>
          <Link href="/editSites">
            <div className="w-[300px] sm:w-[400px] bg-green-600 hover:bg-green-400 text-white font-bold cursor-pointer px-6 py-2">
              Edit Existing Site
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
