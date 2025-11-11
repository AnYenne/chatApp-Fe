import { Button } from "../ui"
import Message from "../ui/Message"
import Search from "../ui/Search"

const Chatlist = () => {

    return (
        <>
         <div className="pr-4 py-4 bg-white pl-2 w-sm  md:pl-52 sm:w-3xl md:overflow-x-hidden overflow-hidden">
            <div className="md:flex justify-between items-center min-w-fit hidden">
                <div>
                    <h1 className="font-bold text-2xl">Chats</h1>
                    <ul>Recent chat</ul>
                </div>
                <div>
                    <Button >
                        Create New Chat
                    </Button>
                </div>
            </div>
            <div className="">
                <Search />
            </div>
            <div className="gap-4">
                <Message></Message>
                <Message></Message>
                <Message></Message>
            </div>
        </div>
        <div className="hidden p-2 ">mở</div>
        </>
       
    )
}
export default Chatlist