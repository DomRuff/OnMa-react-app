import React from 'react'
import { useState, useContext } from 'react'
import { Context } from '../App'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addProduct } from '../api/ProductController'

const SellPage = () => {


  // Global state for the user ID
  const {userIdContext} = useContext(Context)
  const [userId, setUserId] = userIdContext


  // Local state for the product input for product creation
  const [newProduct, setNewProduct] = useState({
    category: '',
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    sellerId: userId
  })


  // Navigation hook
  const navigate = useNavigate();



  // Function to handle the product input change
  const handleChange = (e) => {
    setNewProduct({
        ...newProduct,
        [e.target.name]: e.target.value
    });
  }


  // Function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the product input
    if (newProduct.category === '' || newProduct.name === '' || newProduct.description === '' || newProduct.price === 0 || newProduct.quantity === 0) {
      return toast.error('Please fill in all the fields');
    }
    
    // Create product API call
    addProduct(newProduct)
      .then((response) => {
        toast.success('Produced added successfully');
        return navigate('/');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }   

  return (
    <div className='bg-white flex flex-col items-center justify-center'>

      {/* Sell page title */}
      <h1 className='text-3xl font-bold mb-4 mt-4'>Product Information</h1>


      {/* Sell form */}
      <form 
        onSubmit={handleSubmit}
        className='flex flex-col items-center justify-center'>
          <div className="mb-4">

            {/* Product category input */}
            <label className="block text-gray-700 font-bold mb-2">Category</label>
            <select
              name="category"
              value={newProduct.category}
              onChange={handleChange}
              className="bg-gray-200 rounded-md p-3 w-64"
            >
              <option value="" disabled>Select Category</option>
              <option value="Books">Books</option>
              <option value="Electronics">Electronics</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Fashion">Fashion</option>
              <option value="Grocery">Grocery</option>
              <option value="Home">Home</option>
            </select>
          </div>

          {/* Product name input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              placeholder="Enter the product name"
              required
              onChange={handleChange}
              className="bg-gray-200 rounded-md p-3 w-64"
            />
          </div>


          {/* Product description input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Product Description</label>
            <textarea
              name="description"
              value={newProduct.description}
              placeholder="Enter a brief description of the product"
              required
              onChange={handleChange}
              className="bg-gray-200 rounded-md p-3 w-64 h-32 resize-none"
            />
          </div>


          {/* Product price input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={newProduct.price}
              placeholder="Enter the price"
              required
              onChange={handleChange}
              className="bg-gray-200 rounded-md p-3 w-64"
            />
          </div>

          {/* Product quantity input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={newProduct.quantity}
              placeholder="Enter the quantity"
              required
              onChange={handleChange}
              className="bg-gray-200 rounded-md p-3 w-64"
            />
          </div>

          {/* Add product button */}
          <button
              type='submit'
              className='bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-full w-64'
          >
              Add Product
          </button>
      </form>

    

    </div>
  )
}

export default SellPage