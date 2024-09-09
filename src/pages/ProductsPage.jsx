import React from 'react'
import { useState, useContext } from 'react';
import { Context } from '../App';
import Products from '../components/Products';

const ProductsPage = () => {

  return (
    <div>

      {/* List all products */}
      <Products />
    </div>
  )
}

export default ProductsPage