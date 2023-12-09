export type Site = {
  id: string;
  name: string;
  region: string;
  province: string;
  address: string;
  description: string;
  authorEmail: string;
  siteImgData: { imgUrl: string; imgId: string }[];
};
