import React from 'react'

// POST API request to add a new user
export const addUser = async (newUser) => {
        
    const res = await fetch('/api/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    });
    return;
}

// POST API request to login a user
export const login = async (credentials) => {
    const res = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to login');
    }

    const userRes = res.json();
    return userRes;
}

// GET API request to get all users
export const getAllUsers = async () => {

    const res = await fetch('/api/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(!res.ok) {
        throw new Error('Failed to fetch users');
    }

    const users = await res.json();
    return users;
}


// GET API request to get a user by ID
export const getUserById = async (id) => {
    const res = await fetch(`/api/user/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(!res.ok) {
        throw new Error('Failed to fetch user');
    }

    const user = await res.json();
    return user;
}


const UserController = () => {

    return (
        <>
        </>
    )
}

export default UserController