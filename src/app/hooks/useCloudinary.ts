export const useCloudinary = (crypto) => {
  const cloudinaryUpload = async (siteImage) => {
    const clUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`;

    const data = new FormData();

    data.append("file", siteImage);
    data.append("upload_preset", "my-uploads");

    try {
      const res = await fetch(clUrl, {
        method: "POST",
        body: data,
      });
      const img = await res.json();
      return img;
    } catch (e) {
      console.error(e);
      return new Error(e).message;
    }
  };

  const cloudinaryDelete = async (publicId: string) => {
    const generateSHA1 = (timestamp: Number) => {
      const hash = crypto.createHash("sha1");
      hash.update(
        `public_id=${publicId}&timestamp=${timestamp}${process.env.NEXT_PUBLIC_API_SECRET}`
      );
      return hash.digest("hex");
    };

    const clUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/destroy`;
    const timestamp = new Date().getTime();

    const data = new FormData();

    data.append("public_id", publicId);
    data.append("api_key", process.env.NEXT_PUBLIC_API_KEY);
    data.append("timestamp", timestamp);
    data.append("signature", generateSHA1(timestamp));

    try {
      const res = await fetch(clUrl, {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      return result;
    } catch (e) {
      // console.error(e);
      // if (e instanceof Error) console.log(e.stack);
      if (e instanceof Error) {
        return new Error(e.message);
      }
    }
  };

  return { cloudinaryUpload, cloudinaryDelete };
};
