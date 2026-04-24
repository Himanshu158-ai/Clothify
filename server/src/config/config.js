import dotenv from "dotenv";
dotenv.config();

if(!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET|| !process.env.PORT|| !process.env.DB_URI || !process.env.JWT_SECRET){
    throw new Error("One or more environment variables not defined in .env file!");
}

export const config={
    port: process.env.PORT,
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    dbUrl:process.env.DB_URI,
    jwt_secret: process.env.JWT_SECRET,
}