import React, { useState, useRef, useEffect } from 'react'
import socket from '../../libs/Socket'
import Button from '../ui/Button'
import Input from '../ui/Input'
import {useConversationStore} from "../../stores/useConversationStore"
import { useAuthStore } from '../../stores/useAuthStore'
import { timeFormatDay, timeFormatSecond } from '../../libs/timeFormat.helper'
import useMessageStore from '../../stores/useMessageStore'


const Mainchat = ({ ...props}) => {

    // const [messages, setMessages] = useState([]);
    const [recipientId, setRecipientId] = useState()

    const [chat, setChat] = useState('')
    const [starting, setStarting] = useState(true)
    const {user} = useAuthStore()
    const {conversations, message, getConversation, getMessage,conversationId , chooseConversation, getAconversation,activeConversation, getMember } = useConversationStore()
    const {sendMessageDirect, sendMessageGroup} = useMessageStore()

    useEffect(() => {
        if(conversations && conversationId){
            setStarting(false)
            console.log(message)
            console.log(user._id)
        }
    },[conversations, conversationId])

   
    useEffect(() => {
        socket.connect()

        socket.on('connect', () => {
            console.log('✅ Client đã kết nối, userid là:', socket.id)
        })
        if(conversationId) socket.emit('joinConversation', conversationId);

        socket.on('disconnect', () => {
            console.log('❌ Client đã ngắt kết nối')
        })

        // Cleanup khi component unmount
        return () => {
            socket.off('connect')
            socket.off('disconnect')
            socket.disconnect()
        }
    }, []) 
    

    const send = async (e) => {
        e.preventDefault()
        // const timeline = new Date().toLocaleTimeString()
        // socket.emit('onchat', {message: chat,timeline ,username })
        if(!user) return
        await getAconversation()
        if(!activeConversation) await getAconversation();
        const recipientId = await getMember(user._id)
            setRecipientId(recipientId)
         if(activeConversation?.type == 'direct'){
             await sendMessageDirect(recipientId, chat, conversationId)
         } else if(activeConversation?.type == 'group'){
             await sendMessageGroup(conversationId, chat)
         }
        socket.emit('onchat', {message: chat, })
        
        }

    return(
        <>
            {!starting ? (
            <div style={{
                textAlign:'center', 
                height:'100%',
                width: '700px',
                padding: '20px',
            }}
            className='md:flex hidden flex-col justify-start items-center overflow-hidden md:flex-1'
            >
                {/* title of chat */}
                {conversations && conversations.map((convo,index) =>{
                    if(convo._id == conversationId){
                        return (
                            <div key={index} className='flex justify-between items-center w-full px-4 py-4 bg-amber-100 border-b border-amber-400 rounded-tr-2xl rounded-tl-2xl shadow-2xs'>
                    <div className="flex justify-start">
                        <div className="w-12 h-12 rounded-4xl overflow-hidden">
                            <img className="w-full h-full " src={convo.avatarUrl ? convo.avatarUrl : "/image/Login-Art.png"} alt="avatar" />
                        </div>
                        <div className="flex flex-col items-start pl-2">
                            <span className="font-semibold">{convo.group?.name || convo.participants[0]?.username}</span>
                            <span className='text-cyan-600'>{convo.type}</span>
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <div className='rounded-4xl bg-amber-300 p-2'>icon </div>
                        <div className='rounded-4xl bg-amber-300 p-2'>icon</div>
                    </div>
                </div>
                        )
                    }
                })}
                
                {/* khung hiển thị message */}
                <div className='max-h-5/6 md:h-full w-full bg-amber-100 overflow-y-scroll' >
                   
                    {/* messages received */}
                     <div className="">
                            {message && message.map((mes, id) => {
                                return(
                                    <div key={id}>
                                    {mes.sendId !== user._id ? ( <div className='flex items-start justify-start gap-2 px-4 py-4 '>
                                <div className="min-w-10 h-10 w-10 rounded-4xl overflow-hidden">
                                    <img className="w-full h-full" src="/image/Login-Art.png" alt="avatar" />
                                </div>
                                <div className='max-w-md'>
                                    <div className='flex gap-2 items-center justify-start'>
                                        <div className='flex flex-col w-fit text-right'>
                                            <span className='bg-amber-600 text-left max-w-fit text-white p-3 block rounded-2xl rounded-tl-none flex-wrap'>
                                                {mes.content ? mes.content :'can I  send you file?'}
                                            </span>
                                            <span className='text-right block'>{mes.createdAt ? timeFormatDay(mes.createdAt): '4 days ago'}</span>
                                        </div>
                                            <span className='h-12 m-1.5'>more</span>
                                    </div>
                                </div>
                                                        
                            </div> )
                            : (
                            <div>
                           
                            <div className='w-full my-2'>
                                <div className='flex gap-2 items-center justify-end mr-4'>
                                        <span className=''>more</span>
                                        <span className='bg-amber-400 text-left max-w-5/6 text-white p-3 block rounded-2xl rounded-tr-none flex-wrap'>
                                                {mes.content ? mes.content :'can I  send you file?'}
                                        </span>
                                </div>
                                    <span className='text-right block mr-4'>{mes.createdAt ? timeFormatDay(mes.createdAt)  : '4 days ago'}</span>
                            </div>
                            </div> )}
                            </div>
                            )
                            })}
                    </div>

                </div>

                {/* input area */}
                <div className='max-h-full w-full h-fit ' >
                    <div className='flex h-full border-t-2 border-gray-200 w-full mt-2'  >
                        <Input
                        type="text"
                        value={chat}
                        onChange={(e)=> setChat(e.target.value)}
                        placeholder="Nhập tin nhắn..."
                        className='w-full py-4 px-4 h-full border-0 flex-wrap '
                        />
                        <Button 
                        variant=''
                        sizes = ''
                        className='bg-transparent text-amber-900 font-bold max-w-2.5 m-4'
                        onClick={e =>send(e)}
                        >
                            Gửi
                        </Button>
                    </div>
                </div>

            </div>
            ): <div className='flex justify-center items-center w-sm'>
                    <div>
                    chọn đoạn chat
                    </div>
                </div>}
        </>
    )
}
export default Mainchat