import React from 'react'
import { useState, useContext } from 'react';
import { Context } from '../App';
import Product from './Product';

const Products = () => {

  // Get the global state of the filtered products
  const {filteredProductsContext} = useContext(Context);
  const [filteredProducts, setFilteredProducts] = filteredProductsContext;

  return (
    <div className='container mx-auto p-4'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>

        {/* List all filtered products */}
        {filteredProducts.map((product, index) => (
          <Product 
            key={product.id} 
            product={product} 
            altBg={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} />
        ))}
      </div>
    </div>
  )
}

export default Products