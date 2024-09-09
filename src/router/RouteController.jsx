import React from 'react'
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider
  } from 'react-router-dom';

// Import layout
import MainLayout from '../layout/MainLayout';

// Import pages
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import NotFoundPage from '../pages/NotFoundPage';
import AccountPage from '../pages/AccountPage';
import ProtectedRoute from '../pages/ProtectedRoute';
import SellPage from '../pages/SellPage';
import ProductsPage from '../pages/ProductsPage';
import CartPage from '../pages/CartPage';

const RouteController = () => {

    //Create router
    const router = createBrowserRouter(
        createRoutesFromElements(
        <Route 
            path='/' 
            element={<MainLayout />}    
        >
            <Route 
            index 
            element={<HomePage />}
            /> 

            <Route
            path='/login'
            element={<LoginPage />}
            />

            <Route 
            path='/signup'
            element={<SignupPage />}
            />

            <Route
            path='/account'
            element={
              <ProtectedRoute>
                 <AccountPage />
              </ProtectedRoute>
            }
            />

            <Route 
            path='/products'
            element={<ProductsPage />}
            />

            <Route
            path='/sell'
            element={
              <ProtectedRoute>
                <SellPage />
              </ProtectedRoute>
            } 
            />

            <Route 
            path='cart'
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
            />

            <Route 
            path='*' 
            element={<NotFoundPage />}   
            />
      </Route>
        )
    )


  return (
    <RouterProvider router={router} />
  )
}

export default RouteController