import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Navigate, useNavigate } from 'react-router-dom'
import { addUser } from '../api/UserController'

const SignupPage = () => {


    // Local state for the user input for account creation
    const [newUser, setNewUser] = useState({
        name: '',
        password: '',
    });


    // Navigation hook
    const navigate = useNavigate();


    // Function to handle the user input change
    const handleChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        });
    }


    // Function to handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
       
        //Create user API call
        addUser(newUser)
            .then(() => {
                toast.success('Account created successfully');
                return navigate('/login');
            })
            .catch((error) => {
                toast.error(error.message);
            });

        return;
    }   



  return (

    <div className='bg-white flex flex-col items-center justify-center'>

        {/* Signup page title */}
        <h1 className='text-3xl font-bold mb-4 mt-4'>Signup</h1>

        {/* Signup form */}
        <form 
            onSubmit={handleSubmit}
            className='flex flex-col items-center justify-center'
        >
    
            {/* Username input */}
            <input 
                type='text'
                name='name'
                value={newUser.name}
                placeholder='Username'
                required
                onChange={handleChange}
                className='bg-gray-200 rounded-md p-3 mb-4 w-64'
            />

            {/* Password input */}
            <input 
                type='password'
                name='password'
                value={newUser.password}
                required
                placeholder='Password'
                onChange={handleChange}
                className='bg-gray-200 rounded-md p-3 mb-4 w-64'
            />

            {/* Signup button */}
            <button 
                type='submit'
                className='bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-full w-64'
                >
                Signup
            </button>
        </form>



        
    </div>
    
    
  )
}

export default SignupPage