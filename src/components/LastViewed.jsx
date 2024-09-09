import React from 'react'
import { useContext, useState, useEffect } from 'react';
import { Context } from '../App';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Modal from './Modal';
import { getSellerNameByProductById } from '../api/ProductController';
import { toast } from 'react-toastify';


const LastViewed = () => {

  // Get local state for last viewed products and user cart
  const {userLastViewedContext, userCartContext} = useContext(Context);
  const [userLastViewed, setUserLastViewed] = userLastViewedContext;
  const [userCart, setUserCart] = userCartContext;

  // Local state for the modal open status
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Local state for selected product
  const [product, setProduct] = useState({});
  const [sellerName, setSellerName] = useState('');
  const [quantity, setQuantity] = useState(1);

  {/* Handle change of selected quantity */}
  const handleQuantityChange = (e) => setQuantity(e.target.value)

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
    if(product.id) {
      fetchSellerName();
    }
}, [product]);


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

  // Settings for the slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  {/* Open modal of product */}
  const handleEntryClick = () => {
    setIsModalOpen(true);
};

{/* Close modal of product */}
const handleCloseModal = () => {
    setIsModalOpen(false);
};


  return (
    <div className='container mx-auto p-4'>
      <h2 className='font-bold text-2xl mb-4'>Last Viewed Products</h2>
      <Slider {...settings}>
        {userLastViewed.map((product, index) => (
          <div 
            key={index} 
            className="p-4"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
              <h3 className="mt-2 text-lg font-bold">{product.name}</h3>
              <p className="mt-1 text-gray-600">EUR {product.price}</p>
              <button
                onClick={() => {
                  setProduct(product);
                  handleEntryClick();
                }}
                className='mt-4 px-5 py-2 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                View
              </button>
            </div>
          </div>
        ))}
      </Slider>

      {/* Product Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <div className='container mx-auto py-5 px-4 md:px-10'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

                    {/* Main Product Information */}
                    <main>
                        <div className='bg-gray-100 p-6 rounded-lg shadow-md'>

                            {/* Display the product name */}
                            <h2
                            className='text-3xl font-bold mb-4 text-center md:text-left'>
                                {product.name}
                            </h2>

                            {/* Display the product description */}
                            <div className='bg-white p-4 rounded-lg shadow-md mb-4'>
                                <h3 className='text-xl font-semibold mb-2'>
                                    Description
                                </h3>
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
                      <div className='bg-gray-100 p-6 rounded-lg shadow-lg'>
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

export default LastViewed