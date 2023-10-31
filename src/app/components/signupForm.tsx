"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    setFormValues({ name: "", email: "", password: "" });

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      console.log(res);
      setLoading(false);
      if (!res.ok) {
        setError((await res.json()).message);
        return;
      }

      await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        callbackUrl: "/",
      });
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
        <h1 className="text-xl font-bold my-4">Register</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3"
        >
          <input
            required
            className="w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40"
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            placeholder="Full Name"
          />
          <input
            required
            className="w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40"
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            required
            className="w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40"
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2"
          >
            {loading ? "loading..." : "Register"}
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link
            className="text-sm mt-3 text-right"
            href={"/auth/login"}
          >
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
      <div className="flex justify-center">
        <Link href="/newSite">Create New Site</Link>
      </div>
    </div>
  );
}
