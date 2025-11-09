const Message = () => {

    return (
        <div className=" border-gray-100 border shadow-xl px-6 py-6 my-2 gap-4 rounded-xl">
            {/* title name and time */}
            <div className="flex justify-between items-center">
                <div className="flex justify-start">
                    <div className="w-14 h-14 rounded-4xl overflow-hidden">
                        <img className="w-full h-full " src="/image/Login-Art.png" alt="avatar" />
                    </div>
                    <div className="flex flex-col items-start pl-2">
                        <span>Name</span>
                        <span>type</span>
                    </div>
                </div>
                <div>1 minute ago</div>
            </div>
            {/* last message and unread count */}
            <div className="flex justify-between pt-2">
                <div className="flex-1">You get things done faster — you don't spend any time coming up with class names, making decisions about selectors, or switching between HTML and CSS files, so your designs come together very fast.</div>
                <div className="px-2 ">2</div>
            </div>
        </div>
    )
}
export default Message