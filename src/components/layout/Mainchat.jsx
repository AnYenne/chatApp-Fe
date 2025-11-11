import React, { useState, useRef, useEffect } from 'react'
import socket from '../../libs/Socket'
import Button from '../ui/Button'
import Input from '../ui/Input'

const Mainchat = () => {

    const [username, setUsername] = useState('');
    const [messages, setMessages] = useState([]);
    const [numberUser, setNumberUser] = useState(0)
    const [chat, setChat] = useState('')
    

    useEffect(() => {
        socket.connect()
        
        socket.on('connect', () => {
            console.log('✅ Client đã kết nối, userid là:', socket.id)
        })

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
    
    useEffect(()=>{
        socket.on('onchat', data => {
            setMessages( pre => [...pre, data])
            console.log(messages)
        })
             // Cleanup khi component unmount
        return () => {
            socket.off('onchat')
            socket.disconnect()
        }
    },[])

    const send = (e) => {
        e.preventDefault()
        const timeline = new Date().toLocaleTimeString()
        socket.emit('onchat', {message: chat,timeline ,username })
    }

    return(
        <>
            <div style={{
                textAlign:'center', 
                display:'flex', 
                flexDirection:'column', 
                alignItems:'center', 
                justifyContent:'start',
                height:'100%',
                width: '700px',
                overflow:'hidden',
                padding: '20px',
            }}>
                {/* title of chat */}
                <div className='flex justify-between items-center w-full px-4 py-4 bg-amber-100 border-b border-amber-400 rounded-tr-2xl rounded-tl-2xl shadow-2xs'>
                    <div className="flex justify-start">
                        <div className="w-12 h-12 rounded-4xl overflow-hidden">
                            <img className="w-full h-full " src="/image/Login-Art.png" alt="avatar" />
                        </div>
                        <div className="flex flex-col items-start pl-2">
                            <span className="font-semibold">Name</span>
                            <span className='text-cyan-600'>type</span>
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <div className='rounded-4xl bg-amber-300 p-2'>icon </div>
                        <div className='rounded-4xl bg-amber-300 p-2'>icon</div>
                    </div>
                </div>

                {/* khung hiển thị message */}
                <div className='max-h-5/6 w-full bg-amber-100 overflow-y-scroll' >
                   
                  {/* <div className="messages"> */}
                            {/* {messages.map((msg, index) => ( */}
                            {/* <div key={index}> */}
                                {/* <strong>{msg.username}</strong>  */}
                                {/* <span>{msg.timeline}</span>: {msg.message} */}
                                {/* <span>{msg.message}</span> */}
                            {/* </div> */}
                        {/* ))} */}
                    {/* </div> */}
                    
                    {/* messages received */}
                     <div className="">
                            <div className='flex items-start justify-start gap-2 px-4 py-4 '>
                                <div className="min-w-10 h-10 w-10 rounded-4xl overflow-hidden">
                                    <img className="w-full h-full" src="/image/Login-Art.png" alt="avatar" />
                                </div>
                                <div className='max-w-md'>
                                    <div className='flex gap-2 items-center justify-start'>
                                        <div className='flex flex-col w-fit text-right'>
                                            <span className='bg-amber-600 text-left max-w-fit text-white p-3 block rounded-2xl rounded-tl-none flex-wrap'>
                                                'can I  send you file?'
                                            </span>
                                            <span className='text-right block'>4 days ago</span>
                                        </div>
                                            <span className='h-12 m-1.5'>more</span>
                                    </div>

                                        <div className='flex gap-2 items-center justify-start'>
                                            <div className='flex flex-col w-fit text-right'>
                                                <span className='bg-amber-600 text-left max-w-fit text-white p-3 block rounded-2xl rounded-tl-none flex-wrap'>
                                                Besides personal and professional team management chatting applications, several online businesses have incorporated conversational UI on their mobile applications as a way of communication with users and providing them with live customer support.
                                                </span>
                                                <span className='text-right block'>4 days ago</span>
                                            </div>
                                            <span className=''>more</span>
                                    </div>
                                    
                                </div>
                                                        
                            </div>


                            {/* messages sent */}
                            <div className='w-full my-2 '>
                                <div className='flex gap-2 items-center justify-end mr-4'>
                                        <span className=''>more</span>
                                        <span className='bg-amber-400 text-left text-white p-3 block rounded-2xl rounded-tr-none flex-wrap'>
                                            'yes oke'
                                        </span>
                                </div>
                                    {/* <span className='text-right block mr-4'>4 days ago</span> */}
                            </div>
                            <div className='w-full my-2'>
                                <div className='flex gap-2 items-center justify-end mr-4'>
                                        <span className=''>more</span>
                                        <span className='bg-amber-400 text-left max-w-5/6 text-white p-3 block rounded-2xl rounded-tr-none flex-wrap'>
                                            Besides personal and professional team management chatting applications, several online businesses have incorporated conversational UI 
                                        </span>
                                </div>
                                    <span className='text-right block mr-4'>4 days ago</span>
                            </div>
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
        </>
    )
}
export default Mainchat