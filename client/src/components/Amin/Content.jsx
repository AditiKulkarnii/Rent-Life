import React, { useState, useEffect } from 'react';
import { db } from "../../../firebase.js";
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
{/* Favicon */}

<script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" defer></script>

const Content = () => {
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
            const productsSnapshot = await db.collection('Product').get();
            // Set the totalProducts state to the number of documents in the collection
            setTotalProducts(productsSnapshot.size);

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
        fetchTotalProducts();
        fetchTotalHouses();
      }, []);

  return (
    <div>
     <main className="min-h-screen">
                <div className="grid mb-4 pb-10 px-8 mx-4 rounded-3xl bg-gray-100 border-4 border-green-400">

                    <div className="grid grid-cols-12 gap-6">
                        <div className="grid grid-cols-12 col-span-12 gap-6 xxl:col-span-9">
                            <div className="col-span-12 mt-8">
                                <div className="flex items-center h-10 intro-y">
                                    <h2 className="mr-5 text-lg font-medium truncate">Dashboard</h2>
                                </div>
                                <div className="grid grid-cols-12 gap-6 mt-5">
                                    <a class="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                                        href="#">
                                        <div class="p-5">
                                            <div class="flex justify-between">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-blue-400"
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                </svg>
                                            </div>
                                            <div class="ml-2 w-full flex-1">
                                                <div>
                                                <div class="mt-1 text-base text-gray-600">Total Products</div>
                                                    <div class="mt-3 text-3xl font-bold leading-8">{totalProducts}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    <a class="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                                        href="#">
                                        <div class="p-5">
                                            <div class="flex justify-between">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-yellow-400"
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                </svg>
                                                
                                            </div>
                                            <div class="ml-2 w-full flex-1">
                                                <div>
                                                    <div class="mt-1 text-base text-gray-600">Products for Rent</div>
                                                    <div class="mt-3 text-3xl font-bold leading-8">{totalProductsForRent}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                  
                                   <a class="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                                        href="#">
                                        <div class="p-5">
                                            <div class="flex justify-between">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-green-400"
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                                </svg>
                                                
                                            </div>
                                            <div class="ml-2 w-full flex-1">
                                                <div>
                                                    <div class="mt-1 text-base text-gray-600">Products for sell</div>
                                                    <div class="mt-3 text-3xl font-bold leading-8">{totalProductsForSale}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>

                                    <a class="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                                        href="#">
                                        <div class="p-5">
                                            <div class="flex justify-between">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-pink-600"
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                                </svg>
                                                
                                            </div>
                                            <div class="ml-2 w-full flex-1">
                                                <div>
                                                    <div class="mt-1 text-base text-gray-600">Products for Both</div>
                                                    <div class="mt-3 text-3xl font-bold leading-8">{totalProductsForBoth}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                           
                            </div>
                            </div>
                            </div>
                            <a class="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                                        href="#">
                                        <div class="p-5">
                                            <div class="flex justify-between">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-pink-600"
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                                </svg>
                                                
                                            </div>
                                            <div class="ml-2 w-full flex-1">
                                                <div>
                                                    <div class="mt-1 text-base text-gray-600">Total Houses</div>
                                                    <div class="mt-3 text-3xl font-bold leading-8">{totalHouses}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>

                                    <a class="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                                        href="#">
                                        <div class="p-5">
                                            <div class="flex justify-between">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-pink-600"
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                                </svg>
                                                
                                            </div>
                                            <div class="ml-2 w-full flex-1">
                                                <div>
                                                    <div class="mt-1 text-base text-gray-600">Houses for Rent</div>
                                                    <div class="mt-3 text-3xl font-bold leading-8">{totalHousesForRent}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>

                                    <a class="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                                        href="#">
                                        <div class="p-5">
                                            <div class="flex justify-between">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-pink-600"
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                                </svg>
                                                
                                            </div>
                                            <div class="ml-2 w-full flex-1">
                                                <div>
                                                    <div class="mt-1 text-base text-gray-600">Houses for Sell</div>
                                                    <div class="mt-3 text-3xl font-bold leading-8">{totalHousesForSale}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>

                                    <a class="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                                        href="#">
                                        <div class="p-5">
                                            <div class="flex justify-between">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-pink-600"
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                                </svg>
                                                
                                            </div>
                                            <div class="ml-2 w-full flex-1">
                                                <div>
                                                    <div class="mt-1 text-base text-gray-600">Houses Both</div>
                                                    <div class="mt-3 text-3xl font-bold leading-8">{totalHousesForBoth}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>

                                    <a class="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white mb-64"
                                        href="#">
                                        <div class="p-5">
                                            <div class="flex justify-between">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-pink-600"
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                                </svg>
                                                
                                            </div>
                                            <div class="ml-2 w-full flex-1">
                                                <div>
                                                    <div class="mt-1 text-base text-gray-600">Furnished Houses</div>
                                                    <div class="mt-3 text-3xl font-bold leading-8">{totalFurnishedHouses}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                            </div>
                            
                            </div>              
            </main> 
    </div>
  )
}

export default Content;
