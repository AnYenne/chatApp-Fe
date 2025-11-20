import {timeFormatDay, timeFormatSecond } from '../../libs/timeFormat.helper'

const Message = ({avatarUrl = '/image/Login-Art.png', name, type, time,children, unReadCount, onClick, className}) => {
    const now = new Date()
    var timeResult= ''
    // Tính chênh lệch (ms)
    const diffMs = now - time; // nếu givenTime trong quá khứ thì diffMs > 0
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours > 24) {
         timeResult = timeFormatDay(time)

    } else {
         timeResult = timeFormatSecond(time)
    }
  

 
    return (
        <div 
        onClick={onClick}
        className={`border-gray-100 border shadow-xl px-6 py-6 my-2 gap-4 rounded-xl ${className}`}  >
            {/* title name and time */}
            <div className="flex justify-between items-center">
                <div className="flex justify-start">
                    <div className="w-12 h-12 rounded-4xl overflow-hidden">
                        <img className="w-full h-full " src={avatarUrl} alt="avatar" />
                    </div>
                    <div className="flex flex-col items-start pl-2">
                        <span className="font-semibold">{name || 'name'  }</span>
                        <span className='text-cyan-600'>{type || 'type'}</span>
                    </div>
                </div>
                <div>{timeResult || '1 minute ago'}</div>
            </div>
            {/* last message and unread count */}
            <div className="flex justify-between pt-2">
                <div className="flex-1">{children || `You get things done faster — you don't spend any time coming up with class names, making decisions about selectors, or switching between HTML and CSS files, so your designs come together very fast.`}</div>
                <div className="px-2 ">{unReadCount || 2}</div>
            </div>
        </div>
    )
}
export default Message