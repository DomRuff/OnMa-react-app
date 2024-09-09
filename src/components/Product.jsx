import React from 'react'
import { useState, useEffect, useContext } from 'react';
import Modal from './Modal';
import { getSellerNameByProductId } from '../api/ProductController';
import { Context } from '../App';
import { toast } from 'react-toastify';

const Product = ( {product, altBg} ) => {


    // Local state for the product seller name, quantity
    const [sellerName, setSellerName] = useState('');
    const [quantity, setQuantity] = useState(1);

    // Local state for the modal open status
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Get the global state of the user cart
    const {userCartContext, userLastViewedContext} = useContext(Context);
    const [userCart, setUserCart] = userCartContext;
    const [userLastViewed, setUserLastViewed] = userLastViewedContext;



    {/* Handle change of selected quantity */}
    const handleQuantityChange = (e) => setQuantity(e.target.value)


    {/* Open modal of product */}
    const handleEntryClick = () => {
        setIsModalOpen(true);

        // Add the product to the last viewed list

        // Check if the product is already in the last viewed list
        const isProductInLastViewed = userLastViewed.find((item) => item.id === product.id);
        if (!isProductInLastViewed) {
            setUserLastViewed([...userLastViewed, product]);
        }
    };

    {/* Close modal of product */}
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    {/* Fetch seller name */}
    useEffect(() => {
        const fetchSellerName = async () => {
            try {
                const name = await getSellerNameByProductById(product.id);
                setSellerName(name);
            } catch (error) {
                console.error('Failed to fetch seller name:', error);
            }
        };

        fetchSellerName();
    }, [product.id]);


    {/* Add product to cart */}
        const handleAddToCart = () => {

            // Get the products in the cart
            const productsInCart = userCart.find((item) => item.product.id === product.id);
            let updatedCart;
            if (productsInCart) {
                updatedCart = userCart.map((item) => {
                    if (item.product.id === product.id) {

                        // Check if the quantity exceeds the available quantity
                        const newQuantity = Math.min(item.quantity + quantity, product.quantity);
                        return {
                            ...item,
                            quantity: newQuantity
                        };
                    } else {
                        return item;
                    }
                });
            } else {

                // Check if the quantity exceeds the available quantity
                const newQuantity = Math.min(quantity, product.quantity);
                updatedCart = [...userCart, { product, quantity: newQuantity }];
        }
        setUserCart(updatedCart);
        toast.success('Product added to cart successfully!');
    };

  return (
    <div className='w-full flex justify-center m-6'>

        {/* Product Card with clickable body for modal opening */}
        <div 
            onClick={handleEntryClick}
            className={`${altBg} flex flex-col items-start rounded-lg shadow-md p-4 w-full max-w-4xl cursor-pointer`}
        >
            {/* Product name */}
            <h2 className="text-3xl">{product.name}</h2>
            {/* Horizontal Line */}
            <hr className='my-2 border-gray-300' />
            
            {/* Product price */}
            <p className="text-2xl font-extrabold mt-2">EUR {product.price}</p>
        </div>


        {/* Product Modal */}
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <div className='container mx-auto py-5 px-4 md:px-10'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

                    {/* Main Product Information */}
                    <main>
                        <div className='bg-gray-100 p-6 rounded-lg shadow-md text-center md:text-left'>

                            {/* Display the product name */}
                            <h2
                            className='text-3xl font-bold mb-4'>
                                {product.name}
                            </h2>

                            {/* Display the product description */}
                            <div className='bg-white p-4 rounded-lg shadow-md text-center md:text-left'>
                                <h2 className='text-xl font-semibold mb-2'>
                                    Description
                                </h2>
                                <p className="text-gray-700">{product.description}</p>
                            </div>

                            {/* Display the product price and quantity */}
                            <div className='flex flex-col md:flex-row justify-between items-center mt-4'>

                                {/* Display the product price */}
                                <p className='text-2xl font-bold text-center md:text-left mb-4 md:mb-0'>
                                    EUR {product.price}
                                </p>

                                {/* Display the product quantity */}
                                <div className='flex items-center'>
                                    <p className='text-sm text-gray-500 mt-1 mr-2'>Available: {product.quantity}</p>
                                    <label className='mr-2'>Quantity</label>
                                    <input
                                        type='number'
                                        name='quantity'
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        min='1'
                                        max={product.quantity}
                                        className='w-16 p-2 border border-gray-300 rounded'
                                    />
                                </div>
                            </div>

                            {/* Add to Cart Button */}
                            <button 
                                onClick={handleAddToCart}
                                className='mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-full w-full'>
                                Add to Cart
                            </button>
                        </div>
                    </main>
                    

                    {/* Seller Information */}
                    <aside>
                    <div className='bg-gray-100 p-6 rounded-lg shadow-lg border border-gray-200'>
                        <h3 className='text-xl font-bold mb-4 text-center md:text-left'>Seller Info</h3>
                        <div className='flex flex-col items-center md:items-start'>
                            <p className='text-2xl text-center md:text-left'>{sellerName}</p>
                        </div>
                        
                    </div>  
                    </aside>
                </div>
            </div>
        </Modal>
    </div>
    
  )
}

export default Product