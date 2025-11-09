import { Button } from "../ui"
import Message from "../ui/Message"
import Search from "../ui/Search"

const Chatlist = () => {

    return (
        <div className="pr-4 py-4 bg-white pl-52 w-3xl overflow-x-hidden">
            <div className="flex justify-between items-center">
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
            <div>
                <Search />
            </div>
            <div className="gap-4">
                <Message></Message>
                <Message></Message>
                <Message></Message>
            </div>
        </div>
    )
}
export default Chatlist