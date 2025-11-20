import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link, useNavigate } from 'react-router';
import { Input, Button } from '../components/ui/index';
import { useAuthStore } from '../stores/useAuthStore';
import {toast} from 'sonner'
import { authService } from '../api/services/Auth.service'



const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const {login} = useAuthStore();
    const navigate = useNavigate()
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (!username) return setError('username is required');
        if (!password) return setError('Password is required');
        if (password.length < 6) return setError('Password as least 6 character');
        //TODO: direct user to 
        
        // axios.post('http://localhost:3002/api/auth/login',{
        //     username,
        //     password,
        // }, { withCredentials: true }
        // )
        //     .then(response => {
        //         console.log(response)
        //     })
        //     .catch(error => console.log('error', 
        //         setError(error.response.data.message )))


        const res = await login(username, password)
        if(res?.response){
            return setError(res.response.data.message)
        }
        // if there is no error redirect to homepage
            navigate('/')
        
    }
        
    
        

    return (
        <div className="flex flex-col-reverse md:flex-row justify-center items-center h-full">
            {/* login frame */}
            <div className='w-sm flex flex-col p-4 md:gap-4'>
                <div className='gap-4'>
                    <h2 className='font-bold text-4xl md:text-2xl'>Welcome Back</h2>
                    <span className='text-xl md:text-sm'>Today is a new day. It's your day. You shape it. Sign in to start managing your projects.</span>
                </div>

                <div className='flex flex-col '>
                    <form className='text-xl' onSubmit={handleSubmit}>
                        <Input
                            label='Username'
                            id={'username'}
                            variant='outline'
                            value={username}
                            type='text'
                            placeholderValue={'type your username here'}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <Input
                            label='Password'
                            variant='outline'
                            value={password}
                            id={'password'}
                            placeholderValue={'at least 8 characters'}
                            type='password'
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {error && <p className='text-sm text-red-500 mb-2'>{error}</p>}

                        <a href='/' className='text-link text-sm py-4 pt-2 block text-right '>Forgot Password?</a>

                        <Button
                            variant='primary'
                            className='h-[52px] sm:h-11 w-full'
                            type='submit'
                        >
                            Sign in
                        </Button>
                    </form>
                </div>

                {/* signup line */}
                <div className='flex justify-center gap-4'>
                    <p>don't you have an account?</p>
                    <Link className='text-link' to='/signup'>Sign up</Link>
                </div>
            </div>

            {/* picture frame */}
            <div className='w-sm h-1/2 p-4 md:h-11/12 overflow-hidden'>
                <img className=' w-full h-full object-cover rounded-3xl' src='/image/Login-Art.png' alt='login art' />
            </div>
        </div>
    );
};

export default Login;