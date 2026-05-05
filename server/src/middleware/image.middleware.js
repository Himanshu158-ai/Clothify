import multer from "multer";
import ImageKit from "imagekit";
import { config } from "../config/config.js";

//initialize imagekit
export const imagekit = new ImageKit({
    publicKey: config.imagekit_public_key,
    privateKey: config.imagekit_private_key,
    urlEndpoint: config.imagekit_url_end_point
});

export const upload = multer({ storage: multer.memoryStorage() });