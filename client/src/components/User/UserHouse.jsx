import React, { useContext, useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app'; 
import UserAside from './UserAside';
import UserHeader from './UserHeader';
import { toast } from 'react-toastify';


function UserHouse() {
  const [housingProducts, setHousingProducts] = useState([]);
  const [updateProductId, setUpdateProductId] = useState(null);
  const [updatedProductName, setUpdatedProductName] = useState('');
  const [updatedProductPrice, setUpdatedProductPrice] = useState(0);
  const [updatedProductDes, setUpdatedProductDes] = useState('');
  const [updatedTransactionType, setUpdatedTransactionType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
  const currentUser = firebase.auth().currentUser; // Get the current user

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = db.collection('House')
        .where('Email', '==', currentUser.email) // Filter by user's email
        .onSnapshot(snapshot => {
          const products = snapshot.docs.map(doc => ({
            ProductID: doc.id,
            ProductName: doc.data().ProductName,
            ProductPrice: doc.data().ProductPrice,
            ProductImgs: doc.data().ProductImgs,
            ProductDes: doc.data().ProductDes,
            TransactionType: doc.data().TransactionType,  
            Bathrooms: doc.data().Bathrooms || null,
            Bedrooms: doc.data().Bedrooms || null,
            Furnished: doc.data().Furnished || false,
          }));
          setHousingProducts(products);
        });
      return () => unsubscribe();
    }
  }, [currentUser]); // Re-run effect when currentUser changes

  const deleteProduct = async (productId) => {
    try {
      const firestore = firebase.firestore();
      const productRef = firestore.collection('Product').doc(productId);
      await productRef.delete();
      console.log('Product deleted successfully');
      toast.success("product deleted ..!!",{autoClose:1000});
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const openUpdateForm = (productId, productName, productPrice, productDes, transactionType) => {
    // Set the state to indicate that an update form should be displayed for this product
    setUpdateProductId(productId);
    setUpdatedProductName(productName);
    setUpdatedProductPrice(productPrice);
    setUpdatedProductDes(productDes);
    setUpdatedTransactionType(transactionType);
  };

  const updateProduct = async () => {
    try {
      const firestore = firebase.firestore();
      const productRef = firestore.collection('House').doc(updateProductId); // Corrected collection name
      await productRef.update({
        ProductName: updatedProductName,
        ProductPrice: updatedProductPrice,
        ProductDes: updatedProductDes,
        TransactionType: updatedTransactionType
      });
      console.log('Product updated successfully');
      toast.success("updated..!!",{autoClose:1000});
      setUpdateProductId(null);
      setUpdatedProductName('');
      setUpdatedProductPrice(0);
      setUpdatedProductDes('');
      setUpdatedTransactionType('');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  const handleNextPage = () => {
    if (currentPage * itemsPerPage < orders.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="flex h-screen bg-gray-800 ">
        {/* Sidebar */}
        <UserAside />

        {/* Main Content */}
        <div className="flex flex-col flex-1 w-full overflow-y-auto">
          <UserHeader />
          <div className="grid mb-4 pb-10 px-8 mx-4 squared-3xl bg-gray-100 border-4 border-green-400 mr-3 rounded-3xl">
            <div className="col-span-12 mt-5">
              {/* Additional content */}
            </div>
            <h1 className="text-2xl font-semibold mb-4">Your Houses</h1>
            <br />
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9  justify-center bg-gray-100 px-7 py-8 ml-3'>
              {housingProducts.length === 0 && <div> No houses to display</div>}
              {housingProducts.map(product => (
                <div key={product.ProductID} className="m-4">
                  <div className="w-96 p-6 bg-white squared-xl shadow-2xl hover:shadow-2xl  ">
                    <img className='w-full h-64 object-cover rounded-t-md' src={product.ProductImgs[0]} alt='not found' />
                    <div className="mt-4">
                      <h3 className="text-2xl font-bold text-gray-700">{product.ProductName}</h3>
                      <p className="block text-xl font-semibold text-gray-700 cursor-auto ">₹{product.ProductPrice}.00</p>
                      <p className="text-gray-700 mt-2">{product.ProductDes.split(' ').slice(0, 10).join(' ')}... <Link to={`/product/${product.ProductID}`} className="text-blue-500">View More</Link></p>
                      <br></br>
                      <hr></hr>

                      <div className='mt-4 mb-2 flex justify-between pl-4 pr-2'>
                        {product.TransactionType === 'sell' && (
                          <button className='text-lg block font-semibold py-2 px-6 text-green-100 hover:text-white bg-green-400 rounded-lg shadow hover:shadow-md transition duration-300'>Sell</button>
                        )}
                        {product.TransactionType === 'rent' && (
                          <button className='text-lg block font-semibold py-2 px-6 text-green-100 hover:text-white bg-green-400 rounded-lg shadow hover:shadow-md transition duration-300'>Rent</button>
                        )}
                        {product.TransactionType === 'both' && (
                          <>
                            <button className='text-lg block font-semibold py-2 px-6 text-green-100 hover:text-white bg-green-400 rounded-lg shadow hover:shadow-md transition duration-300'>Rent</button>
                            <button className='text-lg block font-semibold py-2 px-6 text-green-100 hover:text-white bg-green-400 rounded-lg shadow hover:shadow-md transition duration-300'>Sell</button>
                          </>
                        )}
                      </div>

                      <div className='flex justify-between'>
                        {/* Delete button */}
                        <button
                          className='text-sm block font-semibold py-1 px-4 text-green-100 hover:text-white bg-red-400 rounded-lg shadow hover:shadow-md transition duration-300'
                          onClick={() => deleteProduct(product.ProductID)}
                        >
                          DELETE
                        </button>
                        {/* Update button */}
                        <button
                          className='text-sm block font-semibold py-1 px-4 text-green-100 hover:text-white bg-blue-400 rounded-lg shadow hover:shadow-md transition duration-300'
                          onClick={() => openUpdateForm(product.ProductID, product.ProductName, product.ProductPrice, product.ProductDes, product.TransactionType)}
                        >
                          UPDATE
                        </button>
                      </div>

                      {/* Update form */}
                      {updateProductId === product.ProductID && (
                        <div className="mt-4">
                          <input
                            type="text"
                            placeholder="Updated Name"
                            value={updatedProductName}
                            onChange={(e) => setUpdatedProductName(e.target.value)}
                          />
                          <input
                            type="number"
                            placeholder="Updated Price"
                            value={updatedProductPrice}
                            onChange={(e) => setUpdatedProductPrice(e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Updated Description"
                            value={updatedProductDes}
                            onChange={(e) => setUpdatedProductDes(e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Updated Transaction Type"
                            value={updatedTransactionType}
                            onChange={(e) => setUpdatedTransactionType(e.target.value)}
                          />
                          <button
                            className='text-lg block font-semibold py-2 px-6 text-green-100 hover:text-white bg-blue-400 rounded-lg shadow hover:shadow-md transition duration-300'
                            onClick={updateProduct}
                          >
                            SAVE
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
           
          </div>
          <div className="flex justify-between gap-2 mt-3">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                        Previous
                        </button>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage * itemsPerPage >= housingProducts.length}
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                        Next
              </button>
            </div>  
        </div>
      </div>
    </div>
  );
}

export default UserHouse;
