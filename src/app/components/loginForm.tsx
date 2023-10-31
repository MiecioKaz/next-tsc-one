"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    try {
      setLoading(true);
      setFormValues({ email: "", password: "" });

      const res = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        callbackUrl,
      });
      setLoading(false);
      if (!res.error) {
        router.push(callbackUrl);
      } else {
        setError(res.error);
      }
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Login</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3"
        >
          <input
            required
            type="email"
            name="email"
            onChange={handleChange}
            value={formValues.email}
            placeholder="Email Address"
            className="w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40"
          />
          <input
            required
            type="password"
            name="password"
            onChange={handleChange}
            value={formValues.password}
            placeholder="Password"
            className="w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40"
          />
          <button
            type="submit"
            className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2"
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
            href={"/auth/signup"}
          >
            Don't have an account? <span className="underline">Register</span>
          </Link>
        </form>
      </div>
      <div className="flex justify-center">
        <Link href="/newSite">Create New Site</Link>
        <Link href="/editSite">Edit Existing Site</Link>
      </div>
    </div>
  );
}
