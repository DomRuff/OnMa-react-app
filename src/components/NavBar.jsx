import React from 'react'
import { NavLink } from 'react-router-dom'
import { RiShoppingCart2Line } from "react-icons/ri";
import Search from './Search';
import { Context } from '../App';
import { useState, useContext } from 'react';


const Navbar = () => {

    // Get the global state of the user login status
    const [isLoggedIn, setIsLoggedIn] = useContext(Context).isLoggedInContext;


    // Function to determine the active link
    // Different styling for active and inactive links
    const linkClass = ({ isActive }) =>
        isActive
            ? 'text-black font-bold underline decoration-blue-600 decoration-2 underline-offset-4 px-4 py-2'
            : 'text-black hover:underline decoration-blue-600 decoration-2 underline-offset-4 px-4 py-2';

    return (
        <nav className='bg-white'>
            <div className='mx-auto w-full px-2 sm:px-6 lg:px-6'>
                <div className='flex h-20 items-center justify-between'>

                    {/* Logo */}
                    <div className='flex items-center'>
                        <NavLink to="/" className='text-black text-3xl font-bold'>
                            OnMa
                        </NavLink>
                    </div>

                    {/* Slogan */}
                    <div className='hidden md:flex flex-1 items-end justify-end ml-20'>
                        <span className='text-gray-500 text-xl'>Your online marketplace</span>
                    </div>


                    {/* Navigation Links */}
                    <div className='flex flex-1 items-center justify-end md:items-stretch md:justify-start'>
                        <div className='md:ml-auto'>
                            <div className='flex space-x-2'>

                                {/* Home */}
                                <NavLink to="/" className={linkClass}>
                                    Home
                                </NavLink>

                                {/* Create */}
                                <NavLink to="/sell" className={linkClass}>
                                    Sell
                                </NavLink>

                                {/* Todo-Lists */}
                                <NavLink to="/cart" className={linkClass}>
                                    <RiShoppingCart2Line className='mt-1'/>
                                </NavLink>

                                {/* Login/Account */}
                                <NavLink to={isLoggedIn ? "/account" : "/login"} className={linkClass}>
                                    {isLoggedIn ? "Account" : "Login"}
                                </NavLink>
                                
                            </div>
                        </div>
                        
                    </div>
                </div>

                {/* Horizontal Line */}
                <hr className='my-1 border-gray-300' />

                {/* Search Bar */}
                <div className='w-full'>
                    <Search />
                </div>

                {/* Horizontal Line */}
                <hr className='my-4 border-gray-300' />
            </div>
            
        </nav>
    )
}

export default Navbar