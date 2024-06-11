import React, { useState, useEffect } from 'react';
import { db } from "../../../firebase.js"; // Import your firebase configuration
import { Link } from 'react-router-dom';

const AdminPage = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalProductsForSale, setTotalProductsForSale] = useState(0);
  const [totalProductsForRent, setTotalProductsForRent] = useState(0);
  const [totalProductsForBoth, setTotalProductsForBoth] = useState(0);
  const [totalHouses, setTotalHouses] = useState(0);
  const [totalHousesForSale, setTotalHousesForSale] = useState(0);
  const [totalHousesForRent, setTotalHousesForRent] = useState(0);
  const [totalHousesForBoth, setTotalHousesForBoth] = useState(0);
  const [totalFurnishedHouses, setTotalFurnishedHouses] = useState(0);

  useEffect(() => {
    // Function to fetch total number of products from the database
    const fetchTotalProducts = async () => {
      try {
        // Get a snapshot of the Products collection
        const productsSnapshot = await db.collection('Products').get();
        // Set the totalProducts state to the number of documents in the collection
        setTotalProducts(productsSnapshot.size);

        // Calculate total number of products for sale
        const productsForSale = productsSnapshot.docs.filter(doc => doc.data().TransactionType === 'sell');
        setTotalProductsForSale(productsForSale.length);

        // Calculate total number of products for rent
        const productsForRent = productsSnapshot.docs.filter(doc => doc.data().TransactionType === 'rent');
        setTotalProductsForRent(productsForRent.length);

        // Calculate total number of products for both rent and sell
        const productsForBoth = productsSnapshot.docs.filter(doc => doc.data().TransactionType === 'both');
        setTotalProductsForBoth(productsForBoth.length);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    // Function to fetch total number of houses from the database
    const fetchTotalHouses = async () => {
      try {
        // Get a snapshot of the Houses collection
        const housesSnapshot = await db.collection('House').get();
        // Set the totalHouses state to the number of documents in the collection
        setTotalHouses(housesSnapshot.size);

        // Calculate total number of houses for sale
        const housesForSale = housesSnapshot.docs.filter(doc => doc.data().TransactionType === 'sell');
        setTotalHousesForSale(housesForSale.length);

        // Calculate total number of houses for rent
        const housesForRent = housesSnapshot.docs.filter(doc => doc.data().TransactionType === 'rent');
        setTotalHousesForRent(housesForRent.length);

        // Calculate total number of houses for both rent and sell
        const housesForBoth = housesSnapshot.docs.filter(doc => doc.data().TransactionType === 'both');
        setTotalHousesForBoth(housesForBoth.length);

        // Calculate total number of furnished houses
        const furnishedHouses = housesSnapshot.docs.filter(doc => doc.data().Furnished === true);
        setTotalFurnishedHouses(furnishedHouses.length);
      } catch (error) {
        console.error('Error fetching houses:', error);
      }
    };

    // Call the fetchTotalProducts and fetchTotalHouses functions when the component mounts
    fetchTotalProducts();
    fetchTotalHouses();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <nav className="bg-gray-700 p-4 flex justify-between items-center">
        {/* Logo or Brand */}
        <div className="text-white font-bold text-xl">Admin Dashboard</div>
   
        {/* Profile */}
        <div className="flex items-center">
          <div className="mr-3">
            <img
              className="h-8 w-8 rounded-full"
              src="https://via.placeholder.com/150"
              alt="Admin Profile"
            />
          </div>
          <div className="text-white">Admin Name</div>
        </div>
      </nav>

      {/* Content Container */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="bg-gray-800 text-white w-64">
          <div className="p-4">
            {/* Heading: Products */}
            <div className="text-white font-semibold mb-4">Products</div>
            {/* Subcategories */}
            <Link to={"/all"}>
            <h3>ALL</h3>
            </Link>
           
          </div>
          <Link to={"/house"}>
            <h3>House</h3>
          </Link>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-200">
          {/* Main Content Area */}
          <div className="p-8">
            {/* Display total number of products */}
            <div className="flex flex-row justify-between">
              <div className="bg-white p-8 w-60 rounded-md mb-4">
                <h2 className="text-lg font-semibold text-gray-800 justify-center">Total Products</h2>
                <p className="text-4xl font-bold text-gray-900 justify-center">{totalProducts}</p>
              </div>

              {/* Display total number of houses */}
              <div className="bg-white p-8 w-40 rounded-md shadow-md mb-4 ml-4">
                <h2 className="text-lg font-semibold text-gray-800">Total Houses</h2>
                <p className="text-4xl font-bold text-gray-900">{totalHouses}</p>
              </div>
            </div>

            
            {/* Display total number of products for sale */}
            <div className="bg-white p-4 rounded-md shadow-md mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Total Products For Sale</h2>
              <p className="text-4xl font-bold text-gray-900">{totalProductsForSale}</p>
            </div>
            {/* Display total number of products for rent */}
            <div className="bg-white p-4 rounded-md shadow-md mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Total Products For Rent</h2>
              <p className="text-4xl font-bold text-gray-900">{totalProductsForRent}</p>
            </div>
            {/* Display total number of products for both rent and sell */}
            <div className="bg-white p-4 rounded-md shadow-md mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Total Products For Both Rent and Sell</h2>
              <p className="text-4xl font-bold text-gray-900">{totalProductsForBoth}</p>
            </div>

            
            {/* Display total number of houses for sale */}
            <div className="bg-white p-4 rounded-md shadow-md mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Total Houses For Sale</h2>
              <p className="text-4xl font-bold text-gray-900">{totalHousesForSale}</p>
            </div>
            {/* Display total number of houses for rent */}
            <div className="bg-white p-4 rounded-md shadow-md mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Total Houses For Rent</h2>
              <p className="text-4xl font-bold text-gray-900">{totalHousesForRent}</p>
            </div>
            {/* Display total number of houses for both rent and sell */}
            <div className="bg-white p-4 rounded-md shadow-md mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Total Houses For Both Rent and Sell</h2>
              <p className="text-4xl font-bold text-gray-900">{totalHousesForBoth}</p>
            </div>
            {/* Display total number of furnished houses */}
            <div className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-lg font-semibold text-gray-800">Total Furnished Houses</h2>
              <p className="text-4xl font-bold text-gray-900">{totalFurnishedHouses}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

