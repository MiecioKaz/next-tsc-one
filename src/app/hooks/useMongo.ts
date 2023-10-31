type DetailsSet = {
  name: string;
  region: string;
  province: string;
  address: string;
  description: string;
  userId: string;
  siteImgData?: { imgUrl: string; imgId: string }[];
};

export const useMongoDB = () => {
  const addNewSite = async (detailsSet: DetailsSet) => {
    const res = await fetch("/api/add-site", {
      method: "POST",
      body: JSON.stringify(detailsSet),
      headers: { "Content-Type": "application/json" },
    });
    const site = await res.json();

    return site.insertedId;
  };

  const updateSite = async (detailsSet: DetailsSet, siteId: string) => {
    const res = await fetch(`/api/edit-site?id=${siteId}`, {
      method: "PUT",
      body: JSON.stringify(detailsSet),
      headers: { "Content-Type": "application/json" },
    });
    const site = await res.json();

    return site.acknowledged;
  };

  const updateSiteFieldPush = async (imgData: string[], siteId: string) => {
    const res = await fetch(`/api/edit-field-push?id=${siteId}`, {
      method: "PUT",
      body: JSON.stringify(imgData),
      headers: { "Content-Type": "application/json" },
    });
    const result = await res.json();

    return result.acknowledged;
  };

  const updateSiteFieldPull = async (imgData: string[], siteId: string) => {
    const res = await fetch(`/api/edit-field-pull?id=${siteId}`, {
      method: "PUT",
      body: JSON.stringify(imgData),
      headers: { "Content-Type": "application/json" },
    });
    const result = await res.json();

    return result.acknowledged;
  };

  const getSite = async (siteId: string) => {
    const res = await fetch(`/api/get-site?id=${siteId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const site = await res.json();

    return site;
  };

  const deleteSite = async (siteId: string) => {
    const res = await fetch(`/api/delete-site?id=${siteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const site = await res.json();

    return site.acknowledged;
  };

  return {
    addNewSite,
    updateSite,
    updateSiteFieldPush,
    updateSiteFieldPull,
    getSite,
    deleteSite,
  };
};
