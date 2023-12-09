"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMongoDB } from "../hooks/useMongo";
import { useCloudinary } from "../hooks/useCloudinary";
import crypto from "crypto";
import { CldImage } from "next-cloudinary";
import { ImSpinner3 } from "react-icons/im";
import { TiDelete } from "react-icons/ti";
import { LuFileInput } from "react-icons/lu";
import data from "@/json/italy.json";
import { Site } from "@/types/types";

const EditSiteForm = ({ site }: { site: Site }) => {
  const [formValues, setFormValues] = useState({
    name: site.name,
    region: site.region,
    province: site.province,
    address: site.address,
    description: site.description,
    authorEmail: site.authorEmail,
  });
  const [siteImages, setSiteImages] = useState(site.siteImgData);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const { updateSite, upsertImage, removeImage, deleteSite } = useMongoDB();
  const { cloudinaryUpload, cloudinaryDelete } = useCloudinary(crypto);
  const router = useRouter();
  const regions: Record<string, string[]> = data;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    let selected: File = e.target.files[0];
    const image = await cloudinaryUpload(selected);

    if (image) {
      const imgData = { imgUrl: image.secure_url, imgId: image.public_id };

      const result = await upsertImage(imgData, site.id);
      console.log(result);

      if (result) {
        setSiteImages([...siteImages, imgData]);
      } else {
        setError("Oops! Image upload failed!");
      }
    } else {
      setError("Oops! Image up;oad failed!");
    }
  };

  const handleDeleteImage = async (index: number) => {
    const response = await cloudinaryDelete(siteImages[index].imgId);
    if (response.result === "ok") {
      const remainedImgs = siteImages.filter(
        (img: { imgUrl: string; imgId: string }) => img !== siteImages[index]
      );
      const result = await removeImage(remainedImgs, site.id);
      console.log(result);
      if (result) {
        setSiteImages(remainedImgs);
      }
    }
  };

  const handleEditSite = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(true);

    const response = await updateSite(formValues, site.id);
    if (response) {
      console.log(response);
      setIsEditing(false);
      router.push("/");
    } else {
      setError("Oops! Site update failed");
    }
  };

  const handleDeleteSite = async () => {
    setIsDeleting(true);
    for (let image of siteImages) {
      await cloudinaryDelete(image.imgId);
    }
    const response = await deleteSite(site.id);
    if (response) {
      console.log(response);
      setIsDeleting(false);
      router.push("/");
    } else {
      setError("Oops! Site delete failed!");
    }
  };

  return (
    <>
      <form
        className="w-full mx-auto"
        onSubmit={handleEditSite}
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
          className="w-full h-9 my-4 border rounded border-slate-300 placeholder-gray-600/60"
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
          className="w-full h-9 border rounded border-slate-300 placeholder-gray-600/60"
          required
        >
          <option value="">--Choose a Province--</option>

          {regions &&
            formValues.region &&
            regions[formValues.region].map((province: string) => (
              <option
                key={province}
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

        <div className="w-1/2 mx-auto mt-4">
          {!isEditing && !isDeleting && (
            <button
              type="submit"
              className="w-full h-9 border-2 rounded-2xl border-lime-600 bg-green-800 text-white hover:outline hover:outline-offset-2 hover:outline-green-800"
            >
              Edit Site
            </button>
          )}
          {isEditing && (
            <button
              type="submit"
              className="relative w-full h-9 border-2 rounded-2xl border-lime-600 bg-green-800 text-white hover:outline hover:outline-offset-2 hover:outline-green-800"
            >
              <ImSpinner3
                size={32}
                disabled
                className="absolute top-0 animate-spin"
              />
              <span className="text-center">Editing...</span>
            </button>
          )}
        </div>

        <div className="w-1/3 mx-auto text-center">
          <label
            className="hover:text-lime-500"
            htmlFor="img-select"
          >
            <LuFileInput
              size={50}
              className="mx-auto mt-4 text-red-400 hover:text-lime-500"
            />
            Add a photo
          </label>
          <input
            id="img-select"
            onChange={handleFileChange}
            className="hidden"
            type="file"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2 w-full mt-6">
          {siteImages.length !== 0
            ? siteImages.map(
                (imgData: { imgUrl: string; imgId: string }, index: number) => (
                  <div
                    key={index}
                    className="relative w-32 h-32"
                  >
                    <div
                      onClick={() => handleDeleteImage(index)}
                      className="absolute top-2 left-2 w-6 h-4 rounded-sm bg-white z-10 hover:bg-red-200"
                    >
                      <TiDelete className="mx-auto" />
                    </div>
                    <CldImage
                      src={imgData.imgId}
                      fill
                      sizes="33vw"
                      className="object-cover object-center rounded-xl"
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM0tp9TDwADSgGPmbS4WAAAAABJRU5ErkJggg=="
                      alt="site-image"
                    />
                  </div>
                )
              )
            : "Photos are not included"}
        </div>
      </form>
      <div className="w-1/2 mx-auto mt-4">
        {!isDeleting && !isEditing && (
          <button
            onClick={() => handleDeleteSite()}
            className="w-full h-9 border-2 rounded-2xl border-lime-600 bg-green-800 text-white hover:outline hover:outline-offset-2 hover:outline-green-800"
          >
            Delete Site
          </button>
        )}
        {isDeleting && (
          <button
            type="submit"
            disabled
            className="relative w-full h-9 border-2 rounded-2xl border-lime-600 bg-green-800 text-white hover:outline hover:outline-offset-2 hover:outline-green-800"
          >
            <ImSpinner3
              size={32}
              className="absolute top-0 animate-spin"
            />
            <span className="text-center">Deleting...</span>
          </button>
        )}
      </div>
      {error && (
        <button className="w-full h-9 bg-red-500 text-white">{error}</button>
      )}
    </>
  );
};
export default EditSiteForm;
