import { v2 as cloudinary } from "cloudinary";

// Uploads a base64 image data URL to Cloudinary (config from CLOUDINARY_URL). Anything else → undefined.
export const uploadImage = async (image, folder) => {
  if (typeof image !== "string" || !image.startsWith("data:image/")) return undefined;
  const { secure_url } = await cloudinary.uploader.upload(image, { folder: `happytails/${folder}` });
  return secure_url;
};
