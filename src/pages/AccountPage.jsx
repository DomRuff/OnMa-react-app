import React, { useEffect } from 'react'
import { useState, useContext } from 'react'
import { Context } from '../App'
import { NavLink } from 'react-router-dom'
import { getOrdersByCustomerId, getProductByOrderId, getOpenOrdersBySellerId } from '../api/OrderController'
import { deleteProduct, getProductNameById, updateProduct, getProductsBySellerId } from '../api/ProductController'
import Modal from '../components/Modal'
import { toast } from 'react-toastify'


const AccountPage = () => {

    // Get the global state of the user name, ID, orders, products offered, and open orders by the user
    const {userNameContext, userIdContext, userOrdersContext, userProductsContext, userOpenOrdersContext, resetFunction} = useContext(Context)
    const [userName, setUserName] = userNameContext
    const [userId, setUserId] = userIdContext
    const [userOrders, setUserOrders] = userOrdersContext
    const [userProducts, setUserProducts] = userProductsContext
    const [userOpenOrders, setUserOpenOrders] = userOpenOrdersContext


    // Local state for modal open and editing product
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [updatedProduct, setUpdatedProduct] = useState({
        category: '',
        name: '',
        description: '',
        price: 0,
        quantity: 0,
        sellerId: userId
    });


    // Local state for order information
    const [updatedOrder, setUpdatedOrder] = useState({
      orderDate: '',
      satus: '',
      customerId: '',
      productId: 0,
      quantity: 0,
      totalAmount: 0,
  });





    // Local state for product names
    const [productNames, setProductNames] = useState([]);
    const [openOrderNames, setOpenOrderNames] = useState([]);

  
    // Format date function
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        }).format(date);
      };


    // Load user orders
    useEffect(() => {
        const fetchOrders = async () => {
        try {
            const orders = await getOrdersByCustomerId(userId);
            setUserOrders(orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
        };

        fetchOrders();
    }, [userId]);


    // Load producs sold by the user
    useEffect(() => {
        const fetchProducts = async () => {
        try {
            const products = await getProductsBySellerId(userId);
            setUserProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
        };
        fetchProducts();
    }, [userId]);


    // Load Order Product names
    useEffect(() => {
      const fetchProductNames = async () => {
        try {
          const productNamesArray = await Promise.all(
            userOrders.map(async (order) => {
              const name = await getProductNameById(order.productId);
              return { id: order.id, name };
            })
          );

          const productNamesMap = productNamesArray.reduce((acc, { id, name }) => {
            acc[id] = name;
            return acc;
          }, {});

          setProductNames(productNamesMap);
        } catch (error) {
          console.error('Error fetching product names:', error);
        }
      };


      if (userOrders.length > 0) {
        fetchProductNames();
      }
    }, [userOrders]);


    // Load open orders sold by the user
    useEffect(() => {
      const fetchOpenOrders = async () => {
      try {
          const openProducts = await getOpenOrdersBySellerId(userId);
          setUserOpenOrders(openProducts);
      } catch (error) {
          console.error('Error fetching products:', error);
      }
      };
      fetchOpenOrders();
  }, [userId]);


  // Load Open Order Product names
  useEffect(() => {
    const fetchOpenOrderNames = async () => {
      try {
        const orderNamesArray = await Promise.all(
          userOpenOrders.map(async (openOrder) => {
            const product = await getProductByOrderId(openOrder.id);
            const productname = product.name;
            return { id: openOrder.id, productname};
          })
        );

        const openOrderNamesMap = orderNamesArray.reduce((acc, { id, productname }) => {
          acc[id] = productname;
          return acc;
        }, {});

        setOpenOrderNames(openOrderNamesMap);
      } catch (error) {
        console.error('Error fetching open order names:', error);
      }
    };


    if (userOpenOrders.length > 0) {
      fetchOpenOrderNames();
    }
  }, [userOpenOrders]);


    // Modal functions
    const handleCloseModal = () => {
      setIsModalOpen(false);
      setSelectedProduct(null);
    };

  
    // Handle product information change
    const handleProductChange = (e) => {
      setUpdatedProduct({
        ...updatedProduct,
        [e.target.name]: e.target.value,
      });
    };


    // Update product function
    const handleProductSubmit = (e) => {

      e.preventDefault();

      // Validate the product input
      if (updatedProduct.category === '' || updatedProduct.name === '' || updatedProduct.description === '' || updatedProduct.price === 0 || updatedProduct.quantity === 0) {
        return toast.error('Please fill in all the fields');
      }

      // Update product API call
      updateProduct(selectedProduct.id, updatedProduct)
        .then((response) => {
          toast.success('Product updated successfully');
          handleCloseModal();
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }


    // Delete product function
    const handleDeleteProduct = () => {

      // Make sure user wants to delete the product
      if (!window.confirm('Are you sure you want to delete this product?')) {
        return;
      }

      // Delete product API call
      deleteProduct(selectedProduct.id)
        .then((response) => {
          toast.success('Product deleted successfully');
          handleCloseModal();
        })
        .catch((error) => {
          toast.error(error.message);
        
        });
    }

  return (
    <div className='container mx-auto p-4'>
      <div className='mx-auto w-full px-2 sm:px-6 lg:px-6'>
        <div className='w-full flex flex-col'>

          {/* Account Information */}
          <div className='flex justify-between mt-4'>
              <div className='flex flex-col mb-4 md:mb-0'>
                  <h1 className='text-3xl font-bold mb-6 text-center md:text-left'>Your Account</h1>
                  <p>{userName}</p>
              </div>

              <NavLink 
                  to='/' 
                  className='bg-red-600 h-11 text-white font-bold px-4 py-2 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500'
                  onClick={resetFunction}
              >
                  Logout
              </NavLink>
          </div>
        


          {/* Purchase History */}
          <div className='flex flex-col mt-6'>

            {/* Order History Title */}
            <h1 className='text-3xl font-bold mb-4'>Order History</h1>

            {/* Order History Table */}
            <div className='flex flex-col'>
              <div className='flex flex-wrap justify-between border-b-2 border-gray-200 py-2 font-bold'>
                <p className='w-full md:w-1/4 text-left'>Product Name</p>
                <p className='w-full md:w-1/4 text-center'>Order Date</p>
                <p className='w-full md:w-1/4 text-right'>Total Amount</p>
                <p className='w-full md:w-1/4 text-right'>Status</p>
              </div>

              {userOrders.map((order) => (
                <div key={order.id} className='flex justify-between border-b-2 border-gray-200 py-2'>
                  <p className='w-full md:w-1/4 text-left'>{productNames[order.id]}</p>
                  <p className='w-full md:w-1/4 text-center'>{formatDate(order.orderDate)}</p>
                  <p className='w-full md:w-1/4 text-right'>${order.totalAmount.toFixed(2)}</p>
                  <p className='w-full md:w-1/4 text-right'>{order.status}</p>
                </div>
              ))}
            </div>
          </div>
          

          {/* Offered Products */}
          <div className='flex flex-col mt-6'>

            {/* Offered Products Title */}
            <h1 className='text-3xl font-bold mb-4'>Offered Products</h1>

            {/* Order History Table */}
            <div className='flex flex-col'>
              <div className='flex justify-between border-b-2 border-gray-200 py-2 font-bold'>
                <p className='w-full md:w-1/4 text-left'>Product Category</p>
                <p className='w-full md:w-1/4 text-center'>Product Name</p>
                <p className='w-full md:w-1/4 text-right'>Price</p>
                <p className='w-full md:w-1/4 text-right'>Quantity</p>
              </div>

              {userProducts.map((product) => (
                <div 
                  key={product.id} 
                  className='flex justify-between border-b-2 border-gray-200 py-2 cursor-pointer'
                  onClick ={ () => {
                    setSelectedProduct(product);
                    setIsModalOpen(true);
                  }}
                  >
                  <p className='w-full md:w-1/4 text-left'>{product.category}</p>
                  <p className='w-full md:w-1/4 text-center'>{product.name}</p>
                  <p className='w-full md:w-1/4 text-right'>${product.price.toFixed(2)}</p>
                  <p className='w-full md:w-1/4 text-right'>{product.quantity}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Open Orders */}
          <div className='flex flex-col mt-6'>

            {/* Open Orders Title */}
            <h1 className='text-3xl font-bold mb-4'>Open Orders</h1>

            {/* Open Orders Table */}
            <div className='flex flex-col'>
              <div className='flex justify-between border-b-2 border-gray-200 py-2 font-bold'>
                <p className='w-full sm:w-1/5 text-left'>Product Name</p>
                <p className='w-full sm:w-1/5 text-left'>Customer ID</p>
                <p className='w-full sm:w-1/5 text-center'>Quantity</p>
                <p className='w-full sm:w-1/5 text-right'>Total Amount</p>
                <p className='w-full sm:w-1/5 text-right'>Status</p>
              </div>

              {userOpenOrders.map((openOrder) => (
                <div 
                  key={openOrder.id} 
                  className='flex flex-wrap justify-between border-b-2 border-gray-200 py-2'
                  >
                  <p className='w-full sm:w-1/5 text-left'>{openOrderNames[openOrder.id]}</p>
                  <p className='w-full sm:w-1/5 text-left'>{openOrder.customerId}</p>
                  <p className='w-full sm:w-1/5 text-center'>{openOrder.quantity}</p>
                  <p className='w-full sm:w-1/5 text-right'>${openOrder.totalAmount.toFixed(2)}</p>
                  <div className='w-full sm:w-1/5 text-right'>
                    <select
                      className='bg-gray-200 rounded-md p-2'>
                      <option value='Pending'>Pending</option>
                      <option value='Shipped'>Shipped</option>
                      <option value='Delivered'>Delivered</option>
                    </select>
                  </div>
                  
                </div>
              ))}
            </div>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
              <div className='flex flex-col p-4 md:p-8'>

                {/* Edit Product Information */}
                <h1 className='text-2xl md:text-3xl font-bold mb-4 text-center md:text-left'>Edit Product</h1>
                

                {/* Product Edit form */}
                <form 
                  onSubmit={handleProductSubmit}
                  className='flex flex-col items-center'
                >
                  <div className="mb-4 w-full">
                    {/* Product category input */}
                    <label className="block text-gray-700 font-bold mb-2">Category</label>
                    <select
                      name="category"
                      value={updatedProduct.category}
                      onChange={handleProductChange}
                      className="bg-gray-200 rounded-md p-3 w-full"
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
                  <div className="mb-4 w-full">
                    <label className="block text-gray-700 font-bold mb-2">Product Name</label>
                    <input
                      type="text"
                      name="name"
                      value={updatedProduct.name}
                      placeholder={selectedProduct.name}
                      required
                      onChange={handleProductChange}
                      className="bg-gray-200 rounded-md p-3 w-full"
                    />
                  </div>


                  {/* Product description input */}
                  <div className="mb-4 w-full">
                    <label className="block text-gray-700 font-bold mb-2">Product Description</label>
                    <textarea
                      name="description"
                      value={updatedProduct.description}
                      placeholder={selectedProduct.description}
                      required
                      onChange={handleProductChange}
                      className="bg-gray-200 rounded-md p-3 w-full h-32 resize-none"
                    />
                  </div>

                  {/* Product price input */}
                  <div className="mb-4 w-full">
                    <label className="block text-gray-700 font-bold mb-2">Price</label>
                    <input
                      type="number"
                      name="price"
                      value={updatedProduct.price || ''}
                      placeholder={selectedProduct.price}
                      required
                      onChange={handleProductChange}
                      className="bg-gray-200 rounded-md p-3 w-full"
                    />
                  </div>


                  {/* Product quantity input */}
                  <div className="mb-4 w-full">
                    <label className="block text-gray-700 font-bold mb-2">Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      value={updatedProduct.quantity || ''}
                      placeholder={selectedProduct.quantity}
                      required
                      onChange={handleProductChange}
                      className="bg-gray-200 rounded-md p-3 w-full"
                    />
                  </div>

                  {/* Add product button */}
                  <button
                      type='submit'
                      className='bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-full w-full md:w-64 mt-4'
                  >
                      Update Product
                  </button>

                  {/* Add product button */}
                  <button
                      onClick={handleDeleteProduct}
                      className='bg-red-600 hover:bg-red-700 text-white font-bold p-3 rounded-full w-full md:w-64 mt-4'
                  >
                      Delete Product
                  </button>
                                            

                </form>
                </div>
            </Modal>
          )}


        </div>
      </div>
    </div>
  )
}

export default AccountPage