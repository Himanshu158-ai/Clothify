import dotenv from "dotenv";
dotenv.config();

if (!process.env.GOOGLE_CLIENT_ID) {
    throw new Error("Environment variable GOOGLE_CLIENT_ID is not defined!");
}
if (!process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("Environment variable GOOGLE_CLIENT_SECRET is not defined!");
}
if (!process.env.PORT) {
    throw new Error("Environment variable PORT is not defined!");
}
if(!process.env.DB_URI){
    throw new Error("Environment variable DB_URI is not defined!");
}
if(!process.env.JWT_SECRET){
    throw new Error("Environment variable JWT_SECRET is not defined!");
}
if(!process.env.BACKEND_URL){
    throw new Error("Environment variable BACKEND_URL is not defined!");
}
if(!process.env.IMAGEKIT_PUBLIC_KEY){
    throw new Error("Environment variable IMAGEKIT_PUBLIC_KEY is not defined!");
}
if(!process.env.IMAGEKIT_PRIVATE_KEY){
    throw new Error("Environment variable IMAGEKIT_PRIVATE_KEY is not defined!");
}
if(!process.env.IMAGEURL_END_POINT){
    throw new Error("Environment variable IMAGEURL_END_POINT is not defined!");
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