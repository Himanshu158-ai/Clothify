import { useState } from "react";

export const useProduct =() => {
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)


    const createProduct = async ({name,description,price,category,stock,images}) => {
        try {
            setLoading(true)
            const data = await createProduct({name,description,price,category,stock,images})
            return data
        }
        catch (error) {
            setError(error)
        }
        finally {
            setLoading(false)
        }
    }

    return {createProduct,}
}