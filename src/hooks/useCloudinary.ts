export const useCloudinary = (crypto: typeof import("crypto")) => {
  const cloudinaryUpload = async (siteImage: string | Blob) => {
    try {
      const clUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`;

      const data = new FormData();

      data.append("file", siteImage);
      data.append("upload_preset", "my-uploads");
      // "my-uploads"

      const res = await fetch(clUrl, {
        method: "POST",
        body: data,
      });
      const img = await res.json();

      return img;
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        return new Error(error.message);
      }
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
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    if (typeof apiKey === "undefined") {
      throw new Error("ertyui");
    }

    data.append("public_id", publicId);
    data.append("api_key", apiKey);
    data.append("timestamp", timestamp.toString());
    data.append("signature", generateSHA1(timestamp));

    try {
      const res = await fetch(clUrl, {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      return result;
    } catch (e) {
      if (e instanceof Error) {
        return new Error(e.message);
      }
    }
  };

  return { cloudinaryUpload, cloudinaryDelete };
};
