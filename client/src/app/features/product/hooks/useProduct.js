import { useState } from "react";
import {  getAllProducts } from "../services/api.service";

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
        }
    }

    return {handelAllProducts}
}