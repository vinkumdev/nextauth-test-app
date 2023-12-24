'use client'
import React from 'react';
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";



const Navbar = () => {

    const { data: session } = useSession();

    const handleSignOut = async () => {
        await signOut();
    };

    const authLinks = (b) => {
        return (
            <>
                <button onClick={handleSignOut} >
                    Logout
                </button>
            </>);
    };

    const guestLinks = (b) => {
        return (
            <>
                <Link href="/account/login" className="text-white hover:text-gray-300">Sign in</Link>
                <Link href="/account/join" className="text-white hover:text-gray-300">Sign up</Link>
            </>);

    };

    return (
        <nav className="bg-blue-500 p-4 container m-auto">
            <div className="flex items-center justify-between">
                <div className="text-white font-bold text-xl">Logo</div>
                <div className="flex space-x-4">
                    {session
                        ? authLinks(true)
                        : guestLinks(true)}

                </div>
            </div>
        </nav>
    );
};

export default Navbar;