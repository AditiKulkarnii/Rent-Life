import React, { useState, useRef } from 'react';
import { db } from "../../../firebase.js"; // Import your firebase configuration
import logo from '../../assets/images/MainLogo.png'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../../config';
import { FiLogOut } from 'react-icons/fi';
import { toast } from 'react-toastify';

const Table = () => {
    const [displayTable, setDisplayTable] = useState(false);
    const [productData, setProductData] = useState([]);
    const [userData, setUserData] = useState([]);
    const tableRef = useRef(null);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState([]); // Define products state variable
    const [searchResults, setsearchResults] = useState([]);


    const handleSearch = event => {
        setSearchQuery(event.target.value);
        if (event.target.value !== '') {
            // Update search results based on filtered products
            setsearchResults(filterProducts(event.target.value));
        } else {
            // Reset search results when search query is empty
            setsearchResults([]);
        }
    };
    
      
      const filterProducts = (query) => {
        return products.filter(product =>
          product.ProductName.toLowerCase().includes(query.toLowerCase()) ||
          product.ProductType.toLowerCase().includes(query.toLowerCase())
        );
      };
      
      

      const handleLogout = async () => {
        try {
          await auth.signOut();
          toast.success("logged out.!");
          console.log("logged out");
          navigate('/'); // Redirect to homepage after logout
        } catch (error) {
          console.error('Error logging out:', error);
        }
      };
    
    const handleUserClick = async () => {
        try {
            const userSnapshot = await db.collection('Register').get();
            const data = userSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setUserData(data);
            setProductData([]); // Clear product data
            setDisplayTable(true);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleAllClick = async () => {
        try {
            const productSnapshot = await db.collection('Product').get();
            const data = productSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProductData(data);
            setUserData([]); // Clear user data
            setDisplayTable(true);
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

    const handleHousesClick = async () => {
        try {
            const houseSnapshot = await db.collection('House').get();
            const data = houseSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProductData(data);
            setUserData([]); // Clear user data
            setDisplayTable(true);
        } catch (error) {
            console.error('Error fetching house data:', error);
        }
    };

    const handleDelete = async (id, type) => {
        try {
            if (type === 'user') {
                await db.collection('Register').doc(id).delete();
                toast.success('Record deleted', { duration: 1000 });
                const updatedUserData = userData.filter(item => item.id !== id);
                setUserData(updatedUserData);
            } else if (type === 'product') {
                await db.collection('Product').doc(id).delete();
                toast.success('Record deleted', { duration: 1000 });
                await db.collection('House').doc(id).delete();
                toast.success('Record deleted', { duration: 1000 });
                const updatedProductData = productData.filter(item => item.id !== id);
                setProductData(updatedProductData);
            }
            // toast.success('Record deleted', { duration: 2000 }); // Display success toast
        } catch (error) {
            console.error('Error deleting record:', error);
            toast.error('Error deleting record',{autoClose:1000});
        }
    };

    const saveAsPDF = () => {
        const table = tableRef.current;
        if (!table) return;
    
        // Calculate total number of products
        const totalProducts = productData.length;
    
        // Calculate total number of products for rent
        const productsForRent = productData.filter(item => item.TransactionType === 'rent').length;
    
        // Calculate total number of products for sale
        const productsForSale = productData.filter(item => item.TransactionType === 'sell').length;
    
        // Calculate total number of products for both
        const productsForBoth = productData.filter(item => item.TransactionType === 'both').length;
    
        html2canvas(table).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    
            // Add text to the PDF
            if (userData.length > 0) {
                const totalUsers = userData.length;
                pdf.setFontSize(12);
                pdf.text(`Total Number of Users: ${totalUsers}`, 10, pdfHeight + 10);
            }
            else{
                pdf.setFontSize(12); // Set font size to match table content
                pdf.text(`Total Number of Products: ${totalProducts}`, 10, pdfHeight + 10);
                pdf.text(`Products for Rent: ${productsForRent}`, 10, pdfHeight + 20);
                pdf.text(`Products for Sale: ${productsForSale}`, 10, pdfHeight + 30);
                pdf.text(`Products for Both: ${productsForBoth}`, 10, pdfHeight + 40);
            }
            pdf.save('table.pdf');
        });

        //Admin Header

      
   
        useEffect(() => {
          const fetchProducts = async () => {
            try {
              const productsCollection = await db.collection('Product').get();
              const productsData = productsCollection.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));
              setProducts(productsData);
            } catch (error) {
              console.error('Error fetching products:', error);
            }
          };
      
          fetchProducts();
        }, []);
      
        // Function to filter products based on search query
     
      
        // Function to handle search input change
     
          

    }

    
    return (
        <div className="flex h-screen bg-gray-800 ">
            {/* Sidebar */}
            <aside className="z-20 flex-shrink-0 hidden w-60 pl-2 overflow-y-auto bg-gray-800 md:block">
                <div>
                    <div className="text-white">
                        <div className="flex p-2  bg-gray-800">
                            <div className="flex py-3 px-2 items-center">
                                <a
                                    className="flex items-center space-x-3 rtl:space-x-reverse"
                                >
                                    <img src={logo} className="h-8" alt="" />
                                    <Link to={'/demo'}>
                                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                                            Rent-a-Life
                                        </span>
                                    </Link>
                                </a>
                            </div>
                        </div>
                        <div>
                            <ul className="mt-6 leading-10">
                                <li className="relative px-2 py-1 ">
                                    <a className="inline-flex items-center w-full text-sm font-semibold text-white transition-colors duration-150 cursor-pointer hover:text-green-500" href=" #" onClick={handleUserClick}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 2c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5zM12 14c-3.313 0-6 2.687-6 6h12c0-3.313-2.687-6-6-6z"/>
                                        </svg>
                                        <Link to={"/table"}>
                                            <span className="ml-4">USERS</span>
                                        </Link>
                                    </a>
                                </li>
                                <li className="relative px-2 py-1 ">
                                    <a className="inline-flex items-center w-full text-sm font-semibold text-white transition-colors duration-150 cursor-pointer hover:text-green-500" href="#" onClick={handleHousesClick}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                        <span className="ml-4">HOUSES</span>
                                    </a>
                                </li>
                                <li className="relative px-2 py-1" x-data="{ Open : false  }">
                                    <div className="inline-flex items-center justify-between w-full text-base font-semibold transition-colors duration-150 text-gray-500  hover:text-yellow-400 cursor-pointer" x-on:click="Open = !Open">
                                        <span className="inline-flex items-center  text-sm font-semibold text-white hover:text-green-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
                                            </svg>
                                            <span className="ml-4" onClick={handleAllClick}>PRODUCTS</span>
                                        </span>
                                        <svg xmlns="http://www.w3.org/2000/svg" x-show="!Open" className="ml-1  text-white w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ display: 'none' }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" x-show="Open" className="ml-1  text-white w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ display: 'none' }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                    <div style={{ display: 'none' }}>
                                        <ul x-transition:enter="transition-all ease-in-out duration-300" x-transition:enter-start="opacity-25 max-h-0" x-transition:enter-end="opacity-100 max-h-xl" x-transition:leave="transition-all ease-in-out duration-300" x-transition:leave-start="opacity-100 max-h-xl" x-transition:leave-end="opacity-0 max-h-0" className="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium  rounded-md shadow-inner  bg-green-400" aria-label="submenu">
                                            <li className="px-2 py-1 text-white transition-colors duration-150">
                                                <div className="px-1 hover:text-gray-800 hover:bg-gray-100 rounded-md">
                                                    <div className="flex items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                        </svg>
                                                        <a href="#" className="w-full ml-2  text-sm font-semibold text-white hover:text-gray-800">Item 1</a>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-col flex-1 w-full overflow-y-auto">
 

            <div>
      <header className="z-40 py-4 bg-gray-800">
        <div className="flex items-center justify-between h-8 px-6 mx-auto">
          {/* Logo */}
          <a href="/" className="flex items-center">
            {/* Your site logo */}
          </a>

          {/* Search bar */}
          <div className="relative mr-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              className="px-3 py-1 text-sm text-gray-900 placeholder-gray-500 border-0 border-b-2 focus:outline-none focus:border-purple-500"
            />
            {searchQuery && (
              <ul className="search-results absolute w-full z-10 bg-white mt-2 rounded-lg shadow-lg">
                {searchResults.map(product => (
                  <li key={`${product.id}`}>
                    <Link to={`/table`} className="search-result-item block px-4 py-2 text-gray-800 hover:bg-gray-100">
                      <div>{product.ProductName}</div>
                      <div className="text-sm text-gray-500">{product.ProductType}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {/* Search icon */}
            <span className="absolute right-0 top-0 mt-3 mr-4">
              <svg
                className="h-4 w-4 fill-current text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  className="heroicon-ui"
                  d="M10 17a7 7 0 1 1 7-7 7 7 0 0 1-7 7zm12.71 2.29a1 1 0 1 1-1.42 1.42l-4.2-4.2a9 9 0 1 1 1.42-1.42l4.2 4.2z"
                />
              </svg>
            </span>
          </div>

          {/* Logout button */}
          <button
            className="p-1 rounded-md focus:outline-none focus:shadow-outline-purple"
            aria-label="Logout"
            onClick={handleLogout}
          >
            <FiLogOut className="w-6 h-6 text-white" />
          </button>
        </div>
      </header>
    </div>
  
                <div className="grid mb-4 pb-10 px-8 mx-4 rounded-3xl bg-gray-100 border-4 border-green-400">
                    <div className="col-span-12 mt-5">
                        {/* Additional content */}
                    </div>
                    <div className="col-span-12 mt-5">
                        <div className="grid gap-2 grid-cols-1 lg:grid-cols-1">
                            <div className="bg-white p-4 shadow-lg rounded-lg">
                                <h1 className="font-bold text-base">Table</h1>
                                {displayTable && (
                                    <div className="mt-4" ref={tableRef}>
                                        <div className="flex flex-col">
                                            <div className="-my-2 overflow-x-auto">
                                                <div className="py-2 align-middle inline-block min-w-full">
                                                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white">
                                                        <table className="min-w-full divide-y divide-gray-200">
                                                            <thead>
                                                                <tr>
                                                                    {userData.length > 0 && (
                                                                        <>
                                                                            <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider text-center">
                                                                                Name
                                                                            </th>
                                                                            <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider text-center">
                                                                                Email
                                                                            </th>
                                                                            <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider text-center">
                                                                                City
                                                                            </th>
                                                                            
                                                                            <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider text-center">
                                                                                Delete
                                                                            </th>
                                                                        </>
                                                                    )}
                                                                    {productData.length > 0 && (
                                                                        
                                                                        <>
                                                                            <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider text-center">
                                                                                Product Name
                                                                            </th>
                                                                            <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider text-center">
                                                                                Price
                                                                            </th>
                                                                            <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider text-center">
                                                                                Transaction Type
                                                                            </th>
                                                                            <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider text-center">
                                                                                Delete
                                                                            </th>
                                                                        </>
                                                                    )}
                                                                </tr>
                                                            </thead>
                                                            <tbody className="bg-white divide-y divide-gray-200">
                                                                
                                                            {(userData.length > 0 || searchResults.length > 0) && 
                                                                [...userData, ...searchResults].map(item => (
                                                                    <tr key={item.id}>
                                                                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-center">{item.name}</td>
                                                                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-center">{item.email}</td>
                                                                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-center">{item.city}</td>
                                                                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-center">
                                                                            <div className="flex space-x-4">
                                                                                <a href="#" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(item.id, 'user')}>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                                    </svg>
                                                                                    <p>Delete</p>
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                               {(productData.length > 0 || searchResults.length > 0) && 
                                                                [...productData, ...searchResults].map(item => (
                                                                    <tr key={item.id}>
                                                                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-center">{item.ProductName}</td>
                                                                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-center">{item.ProductPrice}</td>
                                                                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-center">{item.TransactionType}</td>
                                                                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-center">
                                                                            <div className="flex space-x-4">
                                                                                <a href="#" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(item.id, 'product')}>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                                    </svg>
                                                                                    <p>Delete</p>
                                                                                </a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div class = "flex justify-center">
                <button
                onClick={saveAsPDF}
                className=" w-1/2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-2 rounded justify-center"
               
                >
                Save as PDF
                </button>
                </div>

            </div>
        </div>
    );
};

export default Table;
