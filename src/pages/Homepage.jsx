import Navbar from '../components/layout/Navbar';
import Chatlist from '../components/layout/Chatlist';
import Mainchat from '../components/layout/Mainchat';
import { useAuthStore } from '../stores/useAuthStore';
import { useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router';

const Homepage = () => {
   
    return(
        <div className='2xl:p-16 flex justify-between h-full  w-full'>
            <Navbar />
            <Chatlist />
            <Mainchat />
        </div>
    )
}

export default Homepage;