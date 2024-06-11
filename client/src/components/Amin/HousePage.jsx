import React, { useState, useEffect } from 'react';
import { db } from "../../../firebase.js"; // Import your firebase configuration

const HousePage = () => {
  const [displayTable, setDisplayTable] = useState(false);
  const [houseData, setHouseData] = useState([]);

  const handleHousesClick = async () => {
    try {
      const houseSnapshot = await db.collection('House').get();
      const data = houseSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setHouseData(data);
      setDisplayTable(true);
    } catch (error) {
      console.error('Error fetching house data:', error);
    }
  };

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
            <ul>
              <li className="mb-2"><a href="#" className="text-gray-300 hover:text-white">ALL</a></li>
              
              {/* On click of Housing, fetch and display house details */}
              <li className="mb-2"><a href="#" className="text-gray-300 hover:text-white" onClick={handleHousesClick}>Houses</a></li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-200">
          {/* Main Content Area */}
          <div className="p-8">
            {displayTable && (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction Type</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {houseData.map(item => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{item.ProductName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.ProductPrice}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.TransactionType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HousePage