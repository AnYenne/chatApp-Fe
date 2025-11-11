import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../stores/useAuthStore"

const ProtectedRoute = () => {

    const {accessToken, user, loading} = useAuthStore();

    if(!accessToken){
        return(
        <Navigate
            to='/login'
            replace
        ></Navigate>
    )    
    }
    return(
        <Outlet></Outlet>
    )
    

}
export default ProtectedRoute