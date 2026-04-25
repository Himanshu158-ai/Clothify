import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    role:{
        type:String,
        enum:["buyer","seller"],
        default:"buyer",
    },
    authProvider:{
        type:String,
        enum:["google", "email"],
        default:"email"
    }

}); 

const userModel = mongoose.model("User",UserSchema);
export default userModel;
