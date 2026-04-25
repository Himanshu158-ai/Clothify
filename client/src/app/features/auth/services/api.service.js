import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
});

export const registerUser = async ({ email, contactNo, password, name }) => {
    try {
        const response = await instance.post("/register", { email, contactNo, password, name });
        return response.data;
    } catch (error) {
        if (error.response?.data?.errors) {
            throw error.response.data.errors.map(err => err.msg).join(', ');
        }
        throw error.response?.data?.message || error.message;
    }
};
export const loginUser = async ({ email, password }) => {
    try {
        const response = await instance.post("/login", { email, password });
        return response.data;
    } catch (error) {
        if (error.response?.data?.errors) {
            throw error.response.data.errors.map(err => err.msg).join(', ');
        }
        throw error.response?.data?.message || error.message;
    }
};

export default instance;