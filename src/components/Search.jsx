import React, { useEffect } from 'react'
import { useState, useContext } from 'react';
import { Context } from '../App';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../api/ProductController';


const Search = () => {


    // Get the global state of the products filerted by the search terms and category
    const {filteredProductsContext} = useContext(Context);
    const [filteredProducts, setFilteredProducts] = filteredProductsContext;

    // Local state for the category and search query
    const [category, setCategory] = useState('All Categories');
    const [searchQuery, setSearchQuery] = useState('');


    // Navigation hook
    const navigate = useNavigate();


    // Function to handle the category change
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    }


    // Function to handle the search query change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
      };


    // Function to handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Fetch all products from the API
        getAllProducts()
            .then((products) => {
            const lowerCaseQuery = searchQuery.toLowerCase();

            // Filter products based on the search query, category, and availability
            const filtered = products.filter((product) => {
                const matchesCategory = category === 'All Categories' || product.category === category;
                const matchesQuery = product.name.toLowerCase().includes(lowerCaseQuery) || product.description.toLowerCase().includes(lowerCaseQuery);
                const available = product.quantity > 0;
                return matchesCategory && matchesQuery && available;
            });

            // Update the global state with the filtered products and navigate to the products page
            setFilteredProducts(filtered);
            navigate('/products');
            })
            .catch((error) => {
            console.error('Error fetching products:', error);
            });
    };



  return (
    <div className='flex flex-col md:flex-row justify-center mt-4 space-y-4 md:space-y-0 md:space-x-4'>

        {/* Category Dropdown */}
        <select 
            value={category} 
            onChange={handleCategoryChange} 
            className='w-full md:w-auto px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600'
            >
            <option value="All Categories">All Categories</option>
            <option value="Books">Books</option>
            <option value="Electronics">Electronics</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Fashion">Fashion</option>
            <option value="Grocery">Grocery</option>
            <option value="Home">Home</option>
            {/* Add more categories as needed */}
        </select>

        {/* Search Input */}
        <input 
            type='text' 
            value={searchQuery}
            placeholder='Search...'
            onChange={handleSearchChange} 
            className='w-full md:max-w-2xl px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600'
        />

        {/* Search Button */}
        <button
            className='w-full md:w-auto px-4 py-2 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            onClick={handleSubmit}
        >
            Search
        </button>
    </div>
  )
}

export default Search