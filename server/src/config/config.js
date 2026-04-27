import dotenv from "dotenv";
dotenv.config();

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.PORT || !process.env.DB_URI || !process.env.JWT_SECRET || !process.env.BACKEND_URL || !process.env.IMAGEKIT_PUBLIC_KEY || !process.env.IMAGEKIT_PRIVATE_KEY || !process.env.IMAGEURL_END_POINT) {
    throw new Error("One or more environment variables not defined in .env file!");
}
// config
export const config = {
    port: process.env.PORT,
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    dbUrl: process.env.DB_URI,
    jwt_secret: process.env.JWT_SECRET,
    backend_url: process.env.BACKEND_URL,
    imagekit_public_key: process.env.IMAGEKIT_PUBLIC_KEY,
    imagekit_private_key: process.env.IMAGEKIT_PRIVATE_KEY,
    imagekit_url_end_point: process.env.IMAGEURL_END_POINT
}