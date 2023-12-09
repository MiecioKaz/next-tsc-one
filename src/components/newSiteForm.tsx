"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import crypto from "crypto";
import { useCloudinary } from "../hooks/useCloudinary";
import { useMongoDB } from "../hooks/useMongo";
import { useSession } from "next-auth/react";
import { ImSpinner3 } from "react-icons/im";
import { SetStateAction } from "react";
import axios from "axios";

export default function NewSiteForm({
  regions,
}: {
  regions: Record<string, string[]>;
}) {
  const [formValues, setFormValues] = useState({
    name: "",
    region: "",
    province: "",
    address: "",
    description: "",
  });
  const [siteImages, setSiteImages] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { cloudinaryUpload } = useCloudinary(crypto);
  const { addNewSite } = useMongoDB();
  const router = useRouter();
  const { data: session } = useSession();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    let selected: File = e.target.files[0];

    setSiteImages([...siteImages, selected]);
  };

  const restartState = () => {
    setFormValues({
      name: "",
      region: "",
      province: "",
      address: "",
      description: "",
    });
    setIsLoading(false);
    setSiteImages([]);
  };

  const uploadImgs = async () => {
    try {
      let siteImgData: Array<{ imgUrl: string; imgId: string }> = [];
      for (let img of siteImages) {
        const image = await cloudinaryUpload(img);
        if (image.error) {
          setError("Image uploading failed");
          restartState();
        }
        const { secure_url, public_id } = image;
        siteImgData.push({ imgUrl: secure_url, imgId: public_id });
      }
      return siteImgData;
    } catch (error) {
      setError("Oops! Something wrong happened!");
      restartState();
    }
  };

  const createSite = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const siteImgs = await uploadImgs();
    if (siteImgs === undefined) return;

    let author: string | null | undefined;
    if (
      session &&
      session.user !== undefined &&
      typeof session.user.email === "string"
    ) {
      author = session.user.email;

      const detailsSet = {
        ...formValues,
        authorEmail: author,
      };
      const result = await addNewSite(detailsSet, siteImgs);

      console.log(result);
      if (result) {
        router.push("/");
      } else {
        setError("Oops! Site creation failed!");
        setIsLoading(false);
        restartState();
      }
    }
  };

  return (
    <>
      <form
        className="w-full mx-auto"
        onSubmit={createSite}
      >
        <input
          type="text"
          name="name"
          onChange={(e) =>
            setFormValues({ ...formValues, name: e.target.value })
          }
          value={formValues.name}
          placeholder="Name"
          required
          className="w-full h-9 pl-1 border rounded border-slate-300 placeholder-gray-600/60"
        />
        <select
          name="region"
          value={formValues.region}
          onChange={(e) =>
            setFormValues({ ...formValues, region: e.target.value })
          }
          required
          className="w-full h-9 my-4 border rounded border-slate-300 text-gray-600/60 focus:text-black"
        >
          <option value="">--Choose a Region--</option>

          {regions &&
            Object.keys(regions).map((reg, index) => (
              <option
                key={index}
                value={reg}
              >
                {reg}
              </option>
            ))}
        </select>

        <select
          name="province"
          value={formValues.province}
          onChange={(e) =>
            setFormValues({ ...formValues, province: e.target.value })
          }
          className="w-full h-9 border rounded border-slate-300 text-gray-600/60"
          required
        >
          <option value="">--Choose a Province--</option>

          {regions &&
            formValues.region &&
            regions[formValues.region].map((province, index) => (
              <option
                key={index}
                value={province}
              >
                {province}
              </option>
            ))}
        </select>

        <input
          type="text"
          name="address"
          onChange={(e) =>
            setFormValues({ ...formValues, address: e.target.value })
          }
          value={formValues.address}
          placeholder="Address"
          required
          className="w-full h-9 pl-1 my-4 border rounded border-slate-300 placeholder-gray-600/60"
        />
        <textarea
          typeof="text"
          name="description"
          onChange={(e) =>
            setFormValues({ ...formValues, description: e.target.value })
          }
          value={formValues.description}
          placeholder="Description"
          required
          className="w-full pl-1 border rounded border-slate-300 placeholder-gray-600/60"
          cols={30}
          rows={5}
        ></textarea>

        <label htmlFor="img-select">
          <div className="w-full h-9 whitespace-nowrap overflow-x-scroll p-1 mt-3 border rounded border-slate-300 bg-white text-gray-600/60">
            {siteImages.length !== 0
              ? siteImages.map((siteImage, index) => (
                  <span key={index}>{`${siteImage.name} / `}</span>
                ))
              : "Click to upload an image/One at a time"}
          </div>
        </label>
        <input
          id="img-select"
          className="hidden"
          type="file"
          onChange={handleFileChange}
        />

        <div className="w-1/2 mx-auto mt-4">
          {!isLoading && (
            <button
              type="submit"
              className="relative w-full h-9 border-2 rounded-2xl border-lime-600 bg-green-800 text-white hover:outline hover:outline-offset-2 hover:outline-green-800"
            >
              Add Site
            </button>
          )}
          {isLoading && (
            <button
              type="submit"
              className="relative w-full h-9 border-2 rounded-2xl border-lime-600 bg-green-800 text-white hover:outline hover:outline-offset-2 hover:outline-green-800"
            >
              <ImSpinner3
                size={32}
                className="absolute top-0 animate-spin"
              />
              <span className="text-center">Loading...</span>
            </button>
          )}
        </div>
      </form>

      {error && (
        <button className="w-full h-9 bg-red-500 text-white">{error}</button>
      )}
    </>
  );
}
