"use client";

import { useMongoDB } from "../hooks/useMongo";
import { useState } from "react";
import { useRouter } from "next/navigation";
import crypto from "crypto";
import { useCloudinary } from "../hooks/useCloudinary";
import { useSession } from "next-auth/react";
import { ImSpinner3 } from "react-icons/im";

export default function NewSiteForm({ regions }) {
  const [formValues, setFormValues] = useState({
    name: "",
    region: "",
    province: "",
    address: "",
    description: "",
  });
  const [siteImages, setSiteImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { addNewSite } = useMongoDB();
  const { cloudinaryUpload } = useCloudinary(crypto);
  const router = useRouter();
  const { data: session } = useSession();

  const handleFileChange = async (e) => {
    let selected = e.target.files[0];

    setSiteImages([...siteImages, selected]);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const uploadImgs = async () => {
    let siteImgData: { imgUrl: string; imgId: string }[] = [];
    for (let img of siteImages) {
      const image = await cloudinaryUpload(img);
      const { secure_url, public_id } = image;
      siteImgData.push({ imgUrl: secure_url, imgId: public_id });
    }
    return siteImgData;
  };

  const makeApiAddCall = async (e: Event) => {
    e.preventDefault();
    setIsLoading(true);

    const siteImgData = await uploadImgs();

    const detailsSet = {
      ...formValues,
      userId: session.user.id,
      siteImgData,
    };
    const newSiteId = await addNewSite(detailsSet);
    if (newSiteId) {
      router.push("/");
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        className="w-full mx-auto"
        onSubmit={makeApiAddCall}
      >
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={formValues.name}
          placeholder="Name"
          required
          className="w-full h-9 pl-1 border rounded border-slate-300 placeholder-gray-600/60"
        />
        <select
          name="region"
          value={formValues.region}
          onChange={handleChange}
          required
          className="w-full h-9 my-4 border rounded border-slate-300 text-gray-600/60"
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
          onChange={handleChange}
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
          onChange={handleChange}
          value={formValues.address}
          placeholder="Address"
          required
          className="w-full h-9 pl-1 my-4 border rounded border-slate-300 placeholder-gray-600/60"
        />
        <textarea
          typeof="text"
          name="description"
          onChange={handleChange}
          value={formValues.description}
          placeholder="Description"
          required
          className="w-full pl-1 border rounded border-slate-300 placeholder-gray-600/60"
          cols="30"
          rows="5"
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
    </>
  );
}
