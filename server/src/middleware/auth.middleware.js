import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

//verify token
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token,config.jwt_secret);
        req.userId = decoded.id;
        next();
    }
    catch(err){
        return res.status(401).json({message:"Unauthorized"});
    }
}

export default verifyToken;