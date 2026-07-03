import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "./src/config/config.js"
import authRouter from "./src/routes/auth.route.js"
import dbConnect from "./src/config/db.js"
import passport from "./src/config/passport.js";
import productRouter from "./src/routes/product.route.js";
import cartRouter from "./src/routes/cart.route.js";
import guardx, { RedisStore } from "guardx-rate-limit";
import redisClient from "./src/config/redis.js"
// import { createClient } from "redis";

const app = express();

// Passport initialization
app.use(passport.initialize());

// CORS configuration
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

//data base connection
dbConnect();
const client = await redisClient();



// GuardX
app.use(
    guardx({
        limit: 5,
        windowMs: 30000,
        store: new RedisStore(client)
    })
);


// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use("/api", authRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);

//listner
app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`)
})

export default app;
//THE_END