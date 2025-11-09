import Navbar from '../components/layout/Navbar';
import Chatlist from '../components/layout/Chatlist';
import Mainchat from '../components/layout/Mainchat';

const Homepage = () => {
  
    const send = (e) => {
        e.preventDefault()
        const timeline = new Date().toLocaleTimeString()
        socket.emit('onchat', {message: chat,timeline ,username })
    }
    return(
        <div className='flex justify-between h-full '>
            <Navbar />
            <Chatlist />
            <Mainchat />
        </div>
    )
}

export default Homepage;