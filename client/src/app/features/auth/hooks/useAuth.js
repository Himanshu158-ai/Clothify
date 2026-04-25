import { setUser, setError, setLoading } from "../state/auth.slice"
import { registerUser, loginUser } from "../services/api.service"
import { useDispatch, useSelector } from "react-redux"

export const useAuth = () => {

    const dispatch = useDispatch()
    const { user, loading, error } = useSelector((state) => state.auth)

    const handelRegister = async ({ email, contactNo, password, name }) => {
        try {
            dispatch(setLoading(true))
            const data = await registerUser({ email, contactNo, password, name })
            dispatch(setUser(data))
            return data
        }
        catch (error) {
            dispatch(setError(error))
        }
        finally {
            dispatch(setLoading(false))
        }
    }

    const handelLogin = async ({ email, password }) => {
        try {
            dispatch(setLoading(true))
            const data = await loginUser({ email, password })
            dispatch(setUser(data))
            return data
        }
        catch (error) {
            dispatch(setError(error))
        }
        finally {
            dispatch(setLoading(false))
        }
    }





    return {handelRegister,handelLogin}


}