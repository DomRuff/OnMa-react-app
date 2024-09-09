import React from 'react'
import { getUserById } from './UserController';


// POST API request to add a new product
export const addProduct = async (newProduct) => {

    const res = await fetch('api/product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
    });
    return;
}


// GET API request to get all products
export const getAllProducts = async () => {

  const res = await fetch('/api/product', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  });

  if(!res.ok) {
      throw new Error('Failed to fetch products');
  }

  const products = await res.json();
  return products;
}


// GET API request to get a product by ID
export const getProductById = async (id) => {

  const res = await fetch('/api/product/' + id, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  });

  if(!res.ok) {
      throw new Error('Failed to fetch product');
  }

  const product = await res.json();
  return product;
}

// Request to get all products by a seller ID
// Uses the getUserById function from UserController
export const getSellerIdByProductById = async (id) => {

  try {

    const products = await getAllProducts();
    const product = products.find(product => product.id === id);

    if(!product) {
      throw new Error('Product not found');
    }

    const sellerId = product.sellerId;

    return sellerId;
    
  } catch (error) {
    console.error('Error getting seller ID by product ID:', error);
    throw error
  }
}

// Request to get all products by a seller ID
// Uses the getUserById function from UserController
export const getSellerNameByProductId = async (id) => {

  try {

    const products = await getAllProducts();
    const product = products.find(product => product.id === id);

    if(!product) {
      throw new Error('Product not found');
    }

    const sellerId = product.sellerId;
    const seller = await getUserById(sellerId);

    if(!seller) {
      throw new Error('Seller not found');
    }

    return seller.name;
    
  } catch (error) {
    console.error('Error getting seller name by product ID:', error);
    throw error
  }
}


// Request to get all products by a seller ID
// Uses the getAllProducts function
export const getProductsBySellerId = async (id) => {

  try {

    const products = await getAllProducts();
    const sellerProducts = products.filter(product => product.sellerId === id);

    return sellerProducts;

  } catch (error) {
    console.error('Error getting products by seller ID:', error);
    throw error;
  }
}


// Request to get the name of a product by its ID
// Uses the getProductById function
export const getProductNameById = async (id) => {

  try {

    const product = await getProductById(id);

    if(!product) {
      throw new Error('Product not found');
    }

    return product.name;

  } catch (error) {
    console.error('Error getting product name by ID:', error);
    throw error;
  }
}




// PUT API request to update a product
export const updateProduct = async (id, updateProduct) => {

  try {
    const res = await fetch(`api/product/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateProduct)
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    return;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};


// DELETE API request to delete a product by ID
export const deleteProduct = async (id) => {
  try {
    const res = await fetch(`/api/product/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error('Failed to delete product');
    }

    return;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};


const ProductController = () => {
  return (
    <>
    </>
  )
}

export default ProductController