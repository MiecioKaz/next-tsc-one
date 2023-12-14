"use client";

import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { data: session } = useSession();

  const registerUser = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    axios
      .post("/api/user-register", formValues)
      .then((response) => {
        console.log(response);
        loginUser();
      })
      .catch((error) => {
        if (error.response) {
          setLoading(false);
          setFormValues({ name: "", email: "", password: "" });
          setError(error.response.data.statusText);
          console.log("server responded");
        } else if (error.request) {
          setLoading(false);
          setFormValues({ name: "", email: "", password: "" });
          setError(error.request.message);
          console.log("network error");
        } else {
          setLoading(false);
          setFormValues({ name: "", email: "", password: "" });
          setError(error.message);
          console.log(error);
        }
      });
  };

  const loginUser = () => {
    signIn("credentials", {
      email: formValues.email,
      password: formValues.password,
      redirect: false,
    })
      .then((res) => {
        console.log(res);
        if (res && res.ok) {
          toast.success("User has been created");
          setLoading(false);
          setFormValues({ name: "", email: "", password: "" });
        } else {
          if (res && res.error) {
            setLoading(false);
            setFormValues({ name: "", email: "", password: "" });
            setError(res.error);
          }
        }
      })
      .catch((error) => {
        console.error(error.message);
        setLoading(false);
        setFormValues({ name: "", email: "", password: "" });
        setError(error.message);
      });
  };

  return (
    <div className="grid place-items-center">
      <div className="mt-48 shadow-lg p-5 bg-slate-100 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Register</h1>

        <form
          onSubmit={registerUser}
          className="flex flex-col gap-3"
        >
          <input
            required
            className="w-[300px] sm:w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40"
            type="text"
            name="name"
            value={formValues.name}
            onChange={(e) =>
              setFormValues({ ...formValues, name: e.target.value })
            }
            placeholder="Full Name"
          />
          <input
            required
            className="w-[300px] sm:w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40"
            type="email"
            name="email"
            value={formValues.email}
            onChange={(e) =>
              setFormValues({ ...formValues, email: e.target.value })
            }
            placeholder="Email"
          />
          <input
            required
            className="w-[300px] sm:w-[400px] border border-gray-200 py-2 px-6 bg-zinc-100/40"
            type="password"
            name="password"
            value={formValues.password}
            onChange={(e) =>
              setFormValues({ ...formValues, password: e.target.value })
            }
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
            href={"/userAuth/login"}
          >
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
      {session && (
        <div className="text-center shadow-lg mt-20 p-5 rounded-lg border-t-4 border-green-400">
          {session.user && (
            <h1 className="text-lg font-bold">
              Hello {session.user.name}! You are logged in.
            </h1>
          )}
          <Link href="/newSite">
            <div className="w-[300px] sm:w-[400px] bg-green-600 hover:bg-green-400 text-white font-bold cursor-pointer my-4 px-6 py-2">
              Create New Site
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
