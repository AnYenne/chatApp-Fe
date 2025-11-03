import React, { useState, useRef, useEffect } from 'react';
import socket from '../lib/socket';




 function ChatFrame() {
    const [username, setUsername] = useState('');
    const [messages, setMessages] = useState([]);
    const [numberUser, setNumberUser] = useState(0)
    const [chat, setChat] = useState('')
    
    // useEffect(()=>{
    //     const question = prompt('Ten ban la gi');
    //     if(question){
    //         setUsername(question)
    //     }
    // },[])

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
    },[])
       
    const send = (e) => {
        e.preventDefault()
        const timeline = new Date().toLocaleTimeString()
        socket.emit('onchat', {message: chat,timeline ,username })
        
    }
    return(
        // main chat
        <div style={{
            textAlign:'center', 
            display:'flex', 
            flexDirection:'column', 
            alignItems:'center', 
            justifyContent:'space-between',
            height:'100%'
            }}>
            <div >
                <h1 >Phòng Chat Chung</h1>
                <p>{numberUser} người đang online</p>
            </div>

            {/* khung hiển thị message */}
            <div style={{backgroundColor:'#F5F9FD', width: '370px', height:'400px', color:'black', overflow:'hidden'}} >
                   <div className="messages">
                        {messages.map((msg, index) => (
                        <div key={index}>
                            <strong>{msg.username}</strong> 
                            {/* <span>{msg.timeline}</span>: {msg.message} */}
                            <span>{msg.message}</span>
                        </div>
                        ))}
                     </div>
            </div>

            {/* input area */}
            <div style={{}} >
                <div >
                    <input
                    type="text"
                    value={chat}
                    onChange={(e)=> setChat(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                    style={{width:'300px', height:'40px'}}
                    />
                    <button 
                    style={{width: '80px', height: '40px', backgroundColor:'#9CAAF3', border:'none', borderRadius:'25px'}}
                    onClick={e =>send(e)}
                    >
                        Gửi
                    </button>
                </div>
        </div>

        </div>
    )
}

export default ChatFrame;