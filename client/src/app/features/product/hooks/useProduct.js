import { useState } from "react";
import {  getAllProducts } from "../services/api.service";
import { toast } from "react-toastify";

export const useProduct =() => {
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)

    const handelAllProducts = async () => {
        try {
            const response = await getAllProducts()
            return response;
        }   
        catch (error) {
            setError(error)
            toast.error(error || "Failed to load products");
        }
    }

    return {handelAllProducts}
}