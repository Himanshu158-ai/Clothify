import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "./src/config/config.js"
import authRouter from "./src/routes/auth.route.js"
import dbConnect from "./src/config/db.js"
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
dbConnect();
app.use("/api/auth",authRouter);


app.listen(config.port,() => {
    console.log(`Server running on port ${config.port}`)
})

export default app;