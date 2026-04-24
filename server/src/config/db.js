import mongoose from "mongoose";
import {config} from "./config.js";


const dbConnect = async () => {
    try{
        await mongoose.connect(config.dbUrl);
        console.log("MongoDB connected");
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

export default dbConnect;