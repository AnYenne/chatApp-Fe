import React, { useEffect, useState } from 'react';
import { Input, Button } from '../components/ui/index';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        const emailRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
        if (!email) return setError('Email is required');
        //sua lai error email a..@gmail.com van valid !!
        if (!emailRegex.test(email)) return setError('Email is invalid');
        if (!password) return setError('Password is required');
        if (password.length < 8) return setError('Password as least 8 character');

        // TODO: replace with API call
        console.log('login', { email, password });
    };
    
        

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
                            label='Email'
                            id={'email'}
                            variant='outline'
                            value={email}
                            type='email'
                            placeholderValue={'example@email.com'}
                            onChange={(e) => setEmail(e.target.value)}
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

                        <a href='/' className='text-link text-sm justify-end py-4 self-end pt-2'>Forgot Password?</a>

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
                    <a className='text-link' href='/'>Sign up</a>
                </div>
            </div>

            {/* picture frame */}
            <div className='w-sm h-1/2 p-4 md:h-11/12 overflow-hidden'>
                <img className=' w-full h-full object-cover rounded-3xl' src='/image/Login Art.png' alt='login art' />
            </div>
        </div>
    );
};

export default Login;