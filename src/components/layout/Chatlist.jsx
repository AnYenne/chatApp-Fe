import { useEffect, useState } from "react"
import { Button } from "../ui"
import Message from "../ui/Message"
import Search from "../ui/Search"
import { useAuthStore } from "../../stores/useAuthStore"
import useUserStore  from '../../stores/useUserStore'
import {useConversationStore} from "../../stores/useConversationStore"

const Chatlist = () => {
    
    const [username, setUsername] = useState()
    const {conversations, message, getConversation, getMessage,conversationId , chooseConversation} = useConversationStore()
    // const [convId, setconvId] = useState(conversationsId)
    const {user} = useAuthStore()



    // const handleSearchUser = async (e) => {
    //     e.preventDefault()
    //     // setUsername(e.target.value)
    //     const res =  await searchUser(e.target.value);
    //     setDataSearch((pre) => [...pre, res])
    // }
    // const handleSubmitSearchUser = async(e) => {
    //     const res =  await searchUser(username);
    // }

    const  handleClickConversation = async (id) => {
        await chooseConversation(id)
    }
    console.log('conversationId state',conversationId)

    return (
        <>
         <div className="pr-4 py-4 bg-white pl-2 w-sm  md:pl-52 sm:w-3xl md:overflow-x-hidden overflow-y-scroll">
            <div className="md:flex justify-between items-center min-w-fit hidden">
                <div>
                    <h1 className="font-bold text-2xl">Chats</h1>
                    <ul>Recent chat</ul>
                </div>
                <div className="flex gap-2">
                    <Button >
                        Create New Chat
                    </Button>
                     <Button >
                       Search user
                    </Button>
                </div>
            </div>
            <div className="">
                {/* <Search input={'search chat'} onChange={''} button={'Message'} /> */}
                {/* <Search input={'search user'} onChange={handleSearchUser} onClick={handleSubmitSearchUser} button={'Username'} /> */}
            </div>
            <div className="gap-4">
                  {conversations && conversations.map((convo) => (
                    <Message key={convo._id}
                    onClick={() =>handleClickConversation(convo._id)}
                    className={conversationId == convo._id ? 'bg-amber-400' : ''}
                    type={convo.type}
                    name={convo.group?.name || convo.participants[0]?.username} 
                    unReadCount={convo.unReadCounts[ user._id ]  } 
                    time={convo.lastMessageAt}>
                        {convo.lastMessage?.content}
                    </Message>) )}
                   
            </div>
        </div>
        <div className="hidden p-2 ">mở</div>
        </>
       
    )
}
export default Chatlist