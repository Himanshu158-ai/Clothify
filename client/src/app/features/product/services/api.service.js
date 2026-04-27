import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3000/api/product",
    withCredentials: true
})


export const createProduct = async (product) => {
    try {
        const response = await instance.post("/",product);
        return response.data;
    } catch (error) {
        if(error.response?.data?.errors){
            throw error.response.data.errors.map(err => err.msg).join(", ");
        }
        throw error.response?.data?.message || error.message;
    }
}   