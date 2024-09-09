import React, { useEffect } from 'react'
import { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Context } from '../App'
import { login } from '../api/UserController'
const LoginPage = () => {


    // Local state for the user input for account login
    const [user, setUser] = useState({
      name: '',
      password: '',
    });

    // Get the global state of the user login status, user ID, and user name
    const {isLoggedInContext, userIdContext, userNameContext} = useContext(Context)
    const [isLoggedIn, setIsLoggedIn] = isLoggedInContext
    const [userId, setUserId] = userIdContext
    const [userName, setUserName] = userNameContext


    // Navigation hook
    const navigate = useNavigate();


    // Function to handle the user input change
    const handleChange = (e) => {
      setUser({
          ...user,
          [e.target.name]: e.target.value
      });
    }


    // Function to handle the form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      
      //Login API call
      login(user)
        .then((response) => {
          toast.success('Login successful');

          // Update the global state with the user login status, user ID, and user name and navigate to the home page
          setIsLoggedIn(true)
          setUserId(response.id)
          setUserName(response.name)
          return navigate('/');
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }   


    

  return (

    <div className='bg-white flex flex-col items-center justify-center'>

      {/* Login page title */}
      <h1 className='text-3xl font-bold mb-4 mt-4'>Login</h1>


      {/* Login form */}
      <form 
        onSubmit={handleSubmit}
        className='flex flex-col items-center justify-center'>

          {/* Username input field */}
          <input
              type='text'
              name='name'
              value={user.name}
              placeholder='Username'
              required
              onChange={handleChange}
              className='bg-gray-200 rounded-md p-3 mb-4 w-64'
          />

          {/* Password input field */}
          <input
              type='password'
              name='password'
              value={user.password}
              placeholder='Password'
              required
              onChange={handleChange}
              className='bg-gray-200 rounded-md p-3 mb-4 w-64'
          />

          {/* Login button */}
          <button
              type='submit'
              className='bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-full w-64'
          >
              Login
          </button>
      </form>

      {/* Signup link */}
      <div className='mt-6 flex flex-col items-center'>
          <p>Don't have an account?</p>
          <NavLink to='/signup' className='text-blue-500 hover:underline'>Signup</NavLink>
      </div>
              

    </div>

  )
}

export default LoginPage