import React, { useState, useRef, useEffect } from 'react'
import Socket from '../../libs/Socket'

const Mainchat = () => {

    const [username, setUsername] = useState('');
    const [messages, setMessages] = useState([]);
    const [numberUser, setNumberUser] = useState(0)
    const [chat, setChat] = useState('')
    

    useEffect(() => {
        Socket.connect()
        
        Socket.on('connect', () => {
            console.log('✅ Client đã kết nối, userid là:', Socket.id)
        })

        Socket.on('disconnect', () => {
            console.log('❌ Client đã ngắt kết nối')
        })

        // Cleanup khi component unmount
        return () => {
            Socket.off('connect')
            Socket.off('disconnect')
            Socket.disconnect()
        }
    }, []) 
    
    useEffect(()=>{
        Socket.on('onchat', data => {
            setMessages( pre => [...pre, data])
            console.log(messages)
        })
             // Cleanup khi component unmount
        return () => {
            Socket.off('onchat')
            Socket.disconnect()
        }
    },[])
       

    return(
        <>
            <div style={{
                textAlign:'center', 
                display:'flex', 
                flexDirection:'column', 
                alignItems:'center', 
                justifyContent:'space-between',
                height:'100%',
                width: '800px',
            }}>
                <div >
                    <h1>Phòng Chat Chung</h1>
                    <p>{numberUser} người đang online</p>
                </div>

                {/* khung hiển thị message */}
                <div style={{backgroundColor:'#F5F9FD', width: '100%',  height:'400px', color:'black', overflow:'hidden'}} >
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
        </>
    )
}
export default Mainchat