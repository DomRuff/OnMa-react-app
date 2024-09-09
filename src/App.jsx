import React from 'react'
import { useState, useEffect, createContext } from 'react'

// Import API and routing controllers
import RouteController from './router/RouteController'
import UserController from './api/UserController'
import ProductController from './api/ProductController'
import OrderController from './api/OrderController'


// Create context for global state management
export const Context = createContext();

function App() {

  {/* User information */}
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState(null)
  const [userName, setUserName] = useState("")
  const [userProducts, setUserProducts] = useState([])
  const [userOrders, setUserOrders] = useState([])
  const [userCart, setUserCart] = useState([])
  const [userLastViewed, setUserLastViewed] = useState([])
  const [userOpenOrders, setUserOpenOrders] = useState([])

  {/* Product Information */}
  const [filteredProducts, setFilteredProducts] = useState([])


  {/* Reset function for user logout */}
  const reset = () => {
    setIsLoggedIn(false)
    setUserId(null)
    setUserName("")
    setUserProducts([])
    setUserOrders([])
    setUserCart([])
    setUserLastViewed([])
    setFilteredProducts([])
  }

  
  return (
    <Context.Provider 
      value={{
        isLoggedInContext : [isLoggedIn, setIsLoggedIn],
        userIdContext : [userId, setUserId],
        userNameContext : [userName, setUserName],
        userProductsContext : [userProducts, setUserProducts],
        userOrdersContext : [userOrders, setUserOrders],
        userCartContext : [userCart, setUserCart],
        userLastViewedContext : [userLastViewed, setUserLastViewed],
        userOpenOrdersContext : [userOpenOrders, setUserOpenOrders],
        resetFunction: reset,

        filteredProductsContext : [filteredProducts, setFilteredProducts]
      }}>
      <RouteController />  
      <UserController />
      <ProductController />
      <OrderController />
    </Context.Provider>
  )
}

export default App
