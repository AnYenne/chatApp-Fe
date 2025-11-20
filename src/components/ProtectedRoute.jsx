import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../stores/useAuthStore"
import { useEffect, useState } from "react";
import {useConversationStore} from "../stores/useConversationStore"



const ProtectedRoute = () => {

    const {accessToken, user, loading, fetchMe, refresh} = useAuthStore();
    const [starting, setStart]= useState(true)
    const {conversations, message, getConversation, getMessage,conversationId , chooseConversation,otherMemberId, getAconversation,activeConversation,getMember } = useConversationStore()

    
    

    const init = async () => {
        if(!accessToken){
            await refresh()
        }
        if(accessToken && !user){
            await fetchMe()
        }
        if(!conversations){
            await getConversation()
        }
        if(!message){
            await getMessage(conversationId)
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