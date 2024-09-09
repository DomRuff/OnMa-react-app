import React from 'react'
import { useState, useContext } from 'react';
import { Context } from '../App';
import { addOrder } from '../api/OrderController';
import { updateProduct } from '../api/ProductController';

const CartPage = () => {


    // Get the global state of the user ID and cart
    const {userIdContext, userCartContext} = useContext(Context);
    const [userId, setUserId] = userIdContext;
    const [userCart, setUserCart] = userCartContext;


    // Calculate the total price of the cart
    const totalPrice = userCart.reduce((acc, item) => {
        if (item && item.product && typeof item.product.price === 'number' && typeof item.quantity === 'number') {
          return acc + item.product.price * item.quantity;
        }
        return acc;
      }, 0);

    
    // Remove item from cart
    const handleRemoveItem = (index) => {
        const newCart = userCart.filter((_, i) => i !== index);
        setUserCart(newCart);
    };

    // Increase quantity of item in cart
    const handleIncreaseQuantity = (index) => {
        const newCart = userCart.map((item, i) => {
          if (i === index && item.quantity < item.product.quantity) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        setUserCart(newCart);
    };


    // Decrease quantity of item in cart
    const handleDecreaseQuantity = (index) => {
      const newCart = userCart.map((item, i) => {
        if (i === index && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      setUserCart(newCart);
    };


    // Checkout
    const handleCheckout = async () => {
      try {
        const promises = userCart.map(async (item) => {
          const orderDate = new Date().toISOString().slice(0, 19);
          await addOrder({
            customerId: userId,
            orderDate: orderDate,
            productId: item.product.id,
            quantity: item.quantity,
            status: 'Pending',
            totalAmount: item.quantity * item.product.price,
          });
  
          // Update product quantity in the database
          const updatedProduct = {
            ...item.product,
            quantity: item.product.quantity - item.quantity,
          };

          await updateProduct(updatedProduct.id, updatedProduct);
        });
  
        await Promise.all(promises);
  
        alert('All orders created successfully!');
        setUserCart([]);
      } catch (error) {
        console.error('Error creating orders:', error);
        alert('An error occurred. Please try again.');
      }
    };

  return (
    <div className='container mx-auto p-4'>
      <div className='mx-auto w-full px-2 sm:px-6 lg:px-6'>
        <div className='w-full flex flex-col'>
          {/* Cart title */}
          <h1 className='text-3xl font-bold mb-6 text-center md:text-left'>
              Your cart
          </h1>

          {/* Cart items */}
          {userCart.length === 0 ? (
              <p>Your cart is empty</p>
          ) : (
            <div className='flex flex-col items-center w-full px-4'>
                {userCart.map((item, index) => (
                    <div key={index} className='mb-4 p-4 border rounded-lg flex flex-col md:flex-row justify-between items-center w-full md:w-3/4 lg:w-1/2 bg-white shadow-md'>

                        {/* Card Product name */}
                        <h2 className='text-xl font-bold mb-2 md:mb-0 md:mr-4'>{item.product.name}</h2>
                        <div className='text-right w-full md:w-auto'>

                            {/* Card Product Quantity Buttons */}
                            <div className='flex justify-end mt-2'>
                                <button 
                                onClick={() => handleDecreaseQuantity(index)}
                                className='bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded mr-2'
                                >
                                    -
                                </button>
                                <button 
                                onClick={() => handleIncreaseQuantity(index)}
                                className='bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded disabled:cursor-not-allowed'
                                disabled={item.quantity >= item.product.quantity}
                                >
                                    +
                                </button>
                            </div>

                            {/* Card Product Quantity, Price and Total */}
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: EUR {item.product.price.toFixed(2)}</p>
                            <p>Total: EUR {(item.product.price * item.quantity).toFixed(2)}</p>
                            

                            {/* Card Remove Button */}
                            <button 
                            onClick={() => handleRemoveItem(index)} 
                            className='bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded mt-2'
                            >
                            Remove
                            </button>
                        </div>
                    </div>
                ))}

              {/* Total Price and Checkout Button */}
              <div className='flex flex-col items-center w-full md:w-3/4 lg:w-1/2'>
                  <div className='text-right font-bold text-xl w-full'>
                          Total Price: EUR {totalPrice.toFixed(2)}
                  </div>
                      <button 
                          onClick={handleCheckout}
                          className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-4 w-full'>
                          Checkout
                      </button>
              </div>  
            </div>
          )}
        </div>
      </div>

        

        
    </div>
  )
}

export default CartPage