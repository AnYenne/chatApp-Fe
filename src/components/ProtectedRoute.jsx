import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../stores/useAuthStore"
import { useEffect, useState } from "react";

const ProtectedRoute = () => {

    const {accessToken, user, loading, fetchMe, refresh} = useAuthStore();
    const [starting, setStart]= useState(true)

    const init = async () => {
        if(!accessToken){
            await refresh()
        }
        if(accessToken && !user){
            await fetchMe()
        }
        setStart(false)
    }

    useEffect(() => {
        init()
    },[])

    if(starting || loading){
        return (
            <div className="flex h-screen items-center justify-center">Đang tải trang</div>
        )
    }


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