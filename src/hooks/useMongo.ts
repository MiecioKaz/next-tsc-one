import axios, { AxiosResponse } from "axios";

type Details = {
  name: string;
  region: string;
  province: string;
  address: string;
  description: string;
  authorEmail: string;
};

export const useMongoDB = () => {
  const addNewSite = async (
    detailsSet: Details,
    siteImgSet: { imgUrl: string; imgId: string }[]
  ) => {
    try {
      const response: AxiosResponse = await axios.post("/api/add-site", {
        detailsSet,
        siteImgSet,
      });
      console.log(response);
      const responseData = response.data;
      console.log(responseData);
      return responseData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors
        return error.response?.statusText;
      } else {
        // Handle general errors
        if (error instanceof Error) {
          return error.message;
        }
      }
    }
  };

  const updateSite = async (detailsSet: Details, siteId: string) => {
    try {
      const response: AxiosResponse = await axios.post("/api/edit-site", {
        detailsSet,
        siteId,
      });
      const responseData = response.data;
      console.log(responseData);
      return responseData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors
        return error.response?.statusText;
      } else {
        // Handle general errors
        if (error instanceof Error) {
          return error.message;
        }
      }
    }
  };

  const upsertImage = async (
    imgData: { imgUrl: string; imgId: string },
    siteId: string
  ) => {
    try {
      const response: AxiosResponse = await axios.post("/api/edit-field/push", {
        imgData,
        siteId,
      });
      const responseData = response.data;
      console.log(responseData);
      return responseData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors
        return error.response?.statusText;
      } else {
        // Handle general errors
        if (error instanceof Error) {
          return error.message;
        }
      }
    }
  };

  const removeImage = async (
    leftImages: { imgUrl: string; imgId: string }[],
    siteId: string
  ) => {
    try {
      const response: AxiosResponse = await axios.post("/api/edit-field/pull", {
        leftImages,
        siteId,
      });
      const responseData = response.data;
      console.log(responseData);
      return responseData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors
        return error.response?.statusText;
      } else {
        // Handle general errors
        if (error instanceof Error) {
          return error.message;
        }
      }
    }
  };

  const deleteSite = async (siteId: string) => {
    try {
      const response: AxiosResponse = await axios.post("/api/delete-site", {
        siteId,
      });
      const responseData = response.data;
      console.log(responseData);
      return responseData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors
        return error.response?.statusText;
      } else {
        // Handle general errors
        if (error instanceof Error) {
          return error.message;
        }
      }
    }
  };

  return {
    addNewSite,
    updateSite,
    upsertImage,
    removeImage,
    deleteSite,
  };
};
