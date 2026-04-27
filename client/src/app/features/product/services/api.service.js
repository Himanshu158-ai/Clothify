import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3000/api/product",
    headers: {
        "Content-Type": "multipart/form-data"
    },
    credentials: "include"
})


export const createProduct = async (data) => {
    try {
        const response = await instance.post("/",data);
        return response.data;
    } catch (error) {
        if(error.response?.data?.errors){
            throw error.response.data.errors.map(err => err.msg).join(", ");
        }
        throw error.response?.data?.message || error.message;
    }
}   

export const getAllProducts = async () => {
    try {
        const response = await instance.get("/");
        return response.data;
    } catch (error) {
        if(error.response?.data?.errors){
            throw error.response.data.errors.map(err => err.msg).join(", ");
        }
        throw error.response?.data?.message || error.message;
    }
}
