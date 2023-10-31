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
import data from "../json/italy.json";

const EditSiteForm = ({ site }) => {
  const [formValues, setFormValues] = useState({
    name: site.name,
    region: site.region,
    province: site.province,
    address: site.address,
    description: site.description,
  });
  const [siteImages, setSiteImages] = useState(site.siteImgData);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { updateSite, updateSiteFieldPush, updateSiteFieldPull, deleteSite } =
    useMongoDB();
  const { cloudinaryUpload, cloudinaryDelete } = useCloudinary(crypto);
  const router = useRouter();
  const regions = data;

  const handleFileChange = async (e: Event) => {
    let selected = e.target.files[0];
    const image = await cloudinaryUpload(selected);

    if (image) {
      const imgData = { imgUrl: image.secure_url, imgId: image.public_id };

      const result = await updateSiteFieldPush(imgData, site._id);

      if (result) {
        setSiteImages([
          ...siteImages,
          { imgUrl: image.secure_url, imgId: image.public_id },
        ]);
      }
    }
  };

  const deleteImage = async (index) => {
    const response = await cloudinaryDelete(siteImages[index].imgId);
    if (response.result === "ok") {
      const result = await updateSiteFieldPull(siteImages[index], site._id);
      if (result) {
        const remainedImgs = siteImages.filter(
          (img) => img !== siteImages[index]
        );
        setSiteImages(remainedImgs);
      }
    }
  };

  const handleChange = (event: Event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const makeApiEditCall = async (e: Event) => {
    e.preventDefault();
    setIsEditing(true);

    const detailsSet = {
      ...formValues,
    };
    const response = await updateSite(detailsSet, site._id);

    if (response) {
      router.push("/");
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    for (let image of site.siteImgData) {
      await cloudinaryDelete(image.imgId);
    }
    const response = await deleteSite(site._id);
    if (response) {
      router.push("/");
      setIsDeleting(false);
    }
  };

  return (
    <>
      <form
        className="w-full mx-auto"
        onSubmit={makeApiEditCall}
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
          onChange={handleChange}
          className="w-full h-9 border rounded border-slate-300 placeholder-gray-600/60"
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
            ? siteImages.map((imgData, index) => (
                <div
                  key={index}
                  className="relative w-32 h-32"
                >
                  <div
                    onClick={() => deleteImage(index)}
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
              ))
            : "Photos are not included"}
        </div>
      </form>
      <div className="w-1/2 mx-auto mt-4">
        {!isDeleting && !isEditing && (
          <button
            onClick={() => handleDelete()}
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
    </>
  );
};
export default EditSiteForm;
