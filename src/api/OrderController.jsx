import React from 'react'
import { getAllProducts, getProductById, getSellerIdByProductById } from './ProductController';


// POST API request to add a new order
export const addOrder = async (newOrder) => {

    const res = await fetch('api/order', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },  
        body: JSON.stringify(newOrder)
    });
    return;
}



// GET API request to get all orders
export const getAllOrders = async () => {

    try {
        const res = await fetch('api/order', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(!res.ok) {
            throw new Error('Failed to fetch order');
        }

        const orders = await res.json();
        return orders;
        
    } catch (error) {
        console.error('Error getting all orders:', error);
        throw error
    }
}


// Request to get an order by ID
// Uses the getAllOrders function
export const getOrdersByCustomerId = async (id) => {

    try {
        const orders = await getAllOrders();
        const customerOrders = orders.filter(order => order.customerId === id);
        return customerOrders;
        
    } catch (error) {
        console.error('Error getting orders by customer ID:', error);
        throw error
    }
}


// Request to get open orders by Seller ID
// Uses the getAllOrders function
// Uses the getProductById function
export const getOpenOrdersBySellerId = async (id) => {

    try {

      // Get all products
      const products = await getAllProducts();

      // Filter products by seller ID
      const sellerProducts = products.filter(product => product.sellerId === id);

      // Get all orders
      const orders = await getAllOrders();

      // Filter orders by Pending status
      const openOrders = orders.filter(order => order.status === 'Pending');

      // Filter orders by product ID
      const sellerOrders = openOrders.filter(order => sellerProducts.find(product => product.id === order.productId));

      
      return sellerOrders;
        
    } catch (error) {
        console.error('Error getting open orders by seller ID:', error);
        throw error
    }
}


// Request to get a product by its order ID
// Uses the getProductById function from ProductController
export const getProductByOrderId = async (id) => {

  try {

    // Get order by ID
    const order = await fetch(`/api/order/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Check if order was fetched
    if (!order.ok) {
      throw new Error('Failed to fetch order');
    }


    // Get Product by product ID within order
    const orderData = await order.json();
    const product = await getProductById(orderData.productId);

    return product;
    
  } catch (error) {
    console.error('Error getting product by order ID:', error);
    throw error
    
  }
}



// PUT API request to update an order
export const updateOrder = async (updateOrder) => {
    try {
      const res = await fetch(`/api/order/${updateOrder.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateOrder)
      });
  
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      

      return;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  };


const OrderController = () => {
  return (
    <>
    </>
  )
}

export default OrderController