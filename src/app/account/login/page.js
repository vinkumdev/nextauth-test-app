'use client'
import React, {useState} from 'react';
import {signIn, useSession} from "next-auth/react";
import {redirect, useSearchParams} from 'next/navigation';

const Page = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { data: session, status } = useSession();
    const searchPrams = useSearchParams();

    if(session){
        const callbackUrl = searchPrams.get('callbackUrl') || '/';
        redirect(callbackUrl);
    }

    const handleGoogleLogin = async () => {
        //popupCenter("/account/social", "Google login")
        await signIn('google');
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await signIn('credentials', {
            email: username,
            password: password,
            redirect:false
        })

    }


    return (
        <div className="flex items-center justify-center mt-5">
            <div className="bg-white p-8 w-96">
                <h2 className="text-2xl font-semibold mb-6">Login</h2>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
                    <input type="text" id="username" name="username" className="mt-1 p-2 w-full border rounded-md"
                           onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                    <input type="password" id="password" name="password" className="mt-1 p-2 w-full border rounded-md"
                           onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full"
                onClick={handleLogin}>Login</button>
                <button className="bg-white text-black p-2 rounded-md w-full border mt-5"
                        onClick={() => handleGoogleLogin()}>Login with Google</button>
            </div>
        </div>
    );
};

export default Page;