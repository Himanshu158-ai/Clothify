import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import User from "../models/usermodel.js";

//verify seller
const isSeller = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const tokenPaylod = jwt.verify(token, config.jwt_secret);
        const user = await User.findById(tokenPaylod.id).select("-password");
        if (user.role !== "seller") {
            return res.status(403).json({ message: "You are not authorized to perform this action" });
        }
        req.userId = user.id;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export default isSeller;