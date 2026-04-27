import { useState } from "react";
import { createProduct , getAllProducts } from "../services/api.service";

export const useProduct =() => {
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)


    const handelCreateProduct = async (data) => {
        try {
            setLoading(true)
            const response = await createProduct(data)
            return response;
        }
        catch (error) {
            setError(error)
        }
        finally {
            setLoading(false)
        }
    }

    const handelAllProducts = async () => {
        try {
            const response = await getAllProducts()
            return response;
        }   
        catch (error) {
            setError(error)
        }
    }

    return {handelCreateProduct,handelAllProducts}
}