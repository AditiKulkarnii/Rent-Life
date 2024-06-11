import React, { useContext, useState, useEffect } from 'react';
import { ProductsContext } from './ProductsContext';
import Navbar from "../Navbar";
import { Link, useLocation } from 'react-router-dom';
import Footer from "../Footer1";
import { UserContext } from '../UserContext';
import { toast } from 'react-toastify';
import firebase from 'firebase/compat/app';
import { db } from '../../../firebase'; 
import { FaRegHeart } from 'react-icons/fa';
import { Fragment } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import {WishlistContext} from '../WishlistContext';

const sortOptions = [
  { name: 'Most Popular', current: true },
  { name: 'Newest', current: false },
  { name: 'Price: Low to High',  current: false },
  { name: 'Price: High to Low',  current: false },
]
const subCategories = [
  { name: 'Furniture', href: '/furniture' },
  { name: 'Vehicles', href: '/vehicle' },
  { name: 'Musical Instruments', href: '/music' },
  { name: 'Electronics', href: '/electronics' },
  { name: 'Housing', href: 'housing' },
]
const filters = [
 
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function ElectronicsPage() {
    const { electronicsProducts } = useContext(ProductsContext);
    const { currentUser } = useContext(UserContext); // Current user context
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('query');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [userId, setUserId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(2);
    const [sortBy, setSortBy] = useState('');
    const { wishlist, toggleWishlistItem } = useContext(WishlistContext);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const [filters1, setFilters1] = useState({
      rent: false,
      sell: false,
      both: false,
      surat: false,
      anand: false,
      baroda: false,
      rajkot: false,
      ahemdabad: false,
  });
  
  const handleSortChange = (option) => {
    setSortBy(option);
    // Here, you can add the logic to sort the products based on the selected option
    switch (option) {
      case 'priceHighToLow':
        setFilteredProducts([...filteredProducts.sort((a, b) => b.ProductPrice - a.ProductPrice)]);
        break;
      case 'priceLowToHigh':
        setFilteredProducts([...filteredProducts.sort((a, b) => a.ProductPrice - b.ProductPrice)]);
        break;
     case 'newest':
        // Assuming your product objects have a unique identifier like ProductID
        setFilteredProducts([...filteredProducts.sort((a, b) => parseInt(b.ProductID) - parseInt(a.ProductID))]);
        break;
      default:
        // If no valid option is provided, do nothing
        break;
    }
  };

  useEffect(() => {
    if (searchQuery) {
        // Filter products based on search query
        const filtered = electronicsProducts.filter(product =>
            product.ProductName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        applyFilters(filtered);
    } else {
        // If no search query, display all products
        applyFilters(electronicsProducts);
    }
}, [electronicsProducts, searchQuery, filters1]);



const applyFilters = async (products) => {
  let filtered = [...products];

  // Transaction type filters
  if (filters1.rent && !filters1.sell && !filters1.both) {
      filtered = filtered.filter(product => product.TransactionType === 'rent' || product.TransactionType === 'both');
  } else if (!filters1.rent && filters1.sell && !filters1.both) {
      filtered = filtered.filter(product => product.TransactionType === 'sell' || product.TransactionType === 'both');
  } else if (!filters1.rent && !filters1.sell && filters1.both) {
      filtered = filtered.filter(product => product.TransactionType === 'both');
  } else if (filters1.rent && filters1.sell && !filters1.both) {
      filtered = filtered.filter(product => product.TransactionType === 'rent' || product.TransactionType === 'sell');
  } else if (filters1.rent && !filters1.sell && filters1.both) {
      filtered = filtered.filter(product => product.TransactionType === 'rent' || product.TransactionType === 'both');
  } else if (!filters1.rent && filters1.sell && filters1.both) {
      filtered = filtered.filter(product => product.TransactionType === 'sell' || product.TransactionType === 'both');
  }

  // Retrieve city from Register collection for each product
  try {
      const promises = filtered.map(async (product) => {
          const ownerEmail = product.Email;
          const ownerQuerySnapshot = await db.collection('Register').where('email', '==', ownerEmail).get();
          if (!ownerQuerySnapshot.empty) {
              const ownerData = ownerQuerySnapshot.docs[0].data();
              return ownerData.city;
          } else {
              return null; // City not found
          }
      });

      const cities = await Promise.all(promises);
      // console.log("cities", cities);

      // Apply city filters
      if (filters1.rajkot) {
          filtered = filtered.filter((_, index) => cities[index] && cities[index].trim().toLowerCase() === 'rajkot');
      }
      if (filters1.ahemdabad) {
          filtered = filtered.filter((_, index) => cities[index] && cities[index].trim().toLowerCase() === 'ahmedabad');
      }
      if (filters1.anand) {
          filtered = filtered.filter((_, index) => cities[index] && cities[index].trim().toLowerCase() === 'anand');
      }
      if (filters1.surat) {
          filtered = filtered.filter((_, index) => cities[index] && cities[index].trim().toLowerCase() === 'surat');
      }
      if (filters1.baroda) {
          filtered = filtered.filter((_, index) => cities[index] && cities[index].trim().toLowerCase() === 'baroda');
      }
  } catch (error) {
      console.error('Error retrieving city data:', error);
  }

  setFilteredProducts(filtered);
};

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFilters1(prevFilters => ({
        ...prevFilters,
        [name]: checked
    }));
};

if (!electronicsProducts) {
    return <div>Loading...</div>;
}

    useEffect(() => {
        if (searchQuery) {
            // Filter products based on search query
            const filtered = electronicsProducts.filter(product =>
                product.ProductName.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            // If no search query, display all products
            setFilteredProducts(electronicsProducts);
        }
    }, [electronicsProducts, searchQuery]);

    useEffect(() => {
        // Check if user is logged in
        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
            const userId = currentUser.uid;
            setUserId(userId); // Set the user ID from currentUser
        } else {
            console.error('No user is currently logged in.');
            //toast.error("login first..!",{autoClose:1000});
        }
    }, [currentUser]);

    if (!electronicsProducts) {
        return <div>Loading...</div>;
    }

    console.log(filteredProducts);

    const handleSellRentClick = () => {
        const currentUser = firebase.auth().currentUser;
        if (!currentUser) {
            // User is not logged in, show toast message
            // toast.error("Please login first.",{autoClose:1000});
            return;
        }
        // User is logged in, handle sell/rent logic
        // Add your logic here...
    };

    
    const toggleWishlist = async (productId) => {
      try {
          const currentUser = firebase.auth().currentUser;
          if (!currentUser) {
              console.log("no user logged in");
              toast.error("Please login first.");
              return;
          }

          const response = await fetch("/api/wishlist/addToWishlist", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  productId: productId,
                  userId: currentUser.uid,
              }),
          });

          if (response.ok) {
              toggleWishlistItem(productId);
              if (wishlist.includes(productId)) {
                  toast.success("Product removed from wishlist", { autoClose: 1000 });
              } else {
                  toast.success("Product added to wishlist successfully!", { autoClose: 1000 });
              }
          } else {
              console.error("Failed to toggle product in wishlist");
              toast.error("Error toggling product in wishlist");
          }
      } catch (error) {
          console.error("Error toggling product in wishlist:", error);
          toast.error("Error toggling product in wishlist");
      }
  };

  //   const toggleWishlist = async (productId) => {
  //     try {
  //         const currentUser = firebase.auth().currentUser;
  //         if (!currentUser) {
  //             console.log("no user logged in");
  //             toast.error("Please login first.");
  //             return;
  //         }

  //         const response = await fetch("/api/wishlist/addToWishlist", {
  //             method: "POST",
  //             headers: {
  //                 "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({
  //                 productId: productId,
  //                 userId: currentUser.uid,
  //             }),
  //         });

  //         if (response.ok) {
  //             toggleWishlistItem(productId);
  //             if (wishlist.includes(productId)) {
  //                 toast.success("Product removed from wishlist", { autoClose: 1000 });
  //             } else {
  //                 toast.success("Product added to wishlist successfully!", { autoClose: 1000 });
  //             }
  //         } else {
  //             console.error("Failed to toggle product in wishlist");
  //             toast.error("Error toggling product in wishlist" , { autoClose: 1000 });
  //         }
  //     } catch (error) {
  //         console.error("Error toggling product in wishlist:", error);
  //         toast.error("Error toggling product in wishlist", { autoClose: 1000 });
  //     }
  // };

  // useEffect(() => {
  //   const currentUser = firebase.auth().currentUser;
  
  //   if (!currentUser) { // Check if productId is defined
  //     setIsWishlisted(false);
  //     return;
  //   }
  
  //   fetch(`/api/isProductWishlisted/${currentUser.uid}/${productId}`)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setIsWishlisted(data.isWishlisted);
  //     })
  //     .catch((error) => {
  //       console.error('There was a problem with the fetch operation:', error);
  //     });
  // }, [currentUser]); // Include productId in the dependency array
  
  // const removeFromWishlist = async (productId) => {
  //   try {
  //     const currentUser = firebase.auth().currentUser;
  
  //     if (!currentUser) {
  //       console.log("No user logged in");
  //       toast.error("Please login first.");
  //       return;
  //     }
  
  //     const response = await fetch(`/api/deletefromwishlist/${currentUser.uid}/${productId}`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       }
  //     });
  
  //     if (response.ok) {
  //       const data = await response.json();
  //       toast("Product removed from wishlist", {autoClose: 1000});
  //       setIsWishlisted(data.isWishlisted);
  
  //       // Update local state or context
  //       // const updatedWishlist = wishlist.filter((id) => id !== productId);
  //       toggleWishlistItem(productId); // Assuming toggleWishlistItem updates the context
  //     } else {
  //       console.error("Failed to remove product from wishlist");
  //     }
  //   } catch (error) {
  //     console.error("Error removing product from wishlist:", error);
  //   }
  // };
  

  
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className=''>
            <Navbar />
        
            <div className="bg-white h-screen">
    
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-30 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                      {subCategories.map((category) => (
                        <li key={category.name}>
                          <a href={category.href} className="block px-2 py-3">
                            {category.name}
                          </a>
                        </li>
                      ))}
                    </ul>

                    {filters.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="w-7xl sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 mt-4">
            <h1 className="text-xl font-semibold tracking-tight text-gray-800 ">Filters</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  {sortOptions.map((option) => (
                    <Menu.Item key={option.name}>
                      {({ active }) => (
                        <a
                          href={option.href}
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'group flex items-center px-4 py-2 text-sm'
                          )}
                          onClick={() => handleSortChange(option)}
                        >
                          {option.name}
                        </a>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
                </Transition>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}>{category.name}</a>
                    </li>
                  ))}
                </ul>

                  <Disclosure as="div" className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">Transaction type</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                              <div  className="flex items-center">
                                <input
                                 
                                 type="checkbox"
                                 name="rent"
                                 checked={filters.rent}
                                 onChange={handleCheckboxChange}
                             
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                              
                                  className="ml-3 text-sm text-gray-600"
                                >
                                Rent
                                </label>
                                </div>
                                <div className="space-y-4">
                              <div  className="flex items-center">
                                <input
                                 
                                 type="checkbox"
                                 name="sell"
                                 checked={filters.sell}
                                 onChange={handleCheckboxChange}
                             
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                              
                                  className="ml-3 text-sm text-gray-600"
                                >
                                 Sell
                                </label>
                              </div>
                              </div>
                              <div className="space-y-4">
                              <div  className="flex items-center">
                                <input
                                 
                                 type="checkbox"
                                 name="both"
                                 checked={filters.both}
                                 onChange={handleCheckboxChange}
                             
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                              
                                  className="ml-3 text-sm text-gray-600"
                                >
                                 Both
                                </label>
                              </div>
                              </div>
                          
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>

                  {/* city */}

                  <Disclosure as="div" className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">City</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                              <div  className="flex items-center">
                                <input
                                 
                                 type="checkbox"
                                 name="anand"
                                 checked={filters1.anand}
                                 onChange={handleCheckboxChange}
                             
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                              
                                  className="ml-3 text-sm text-gray-600"
                                >
                                Anand
                                </label>
                                </div>
                                <div className="space-y-4">
                              <div  className="flex items-center">
                                <input
                                 
                                 type="checkbox"
                                 name="ahemdabad"
                                 checked={filters1.ahemdabad}
                                 onChange={handleCheckboxChange}
                             
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                              
                                  className="ml-3 text-sm text-gray-600"
                                >
                                 Ahemdabad
                                </label>
                              </div>
                              </div>
                              <div className="space-y-4">
                              <div  className="flex items-center">
                                <input
                                 
                                 type="checkbox"
                                 name="rajkot"
                                 checked={filters1.rajkot}
                                 onChange={handleCheckboxChange}
                             
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                              
                                  className="ml-3 text-sm text-gray-600"
                                >
                                Rajkot
                                </label>
                              </div>
                              </div>

                              <div className="space-y-4">
                              <div  className="flex items-center">
                                <input
                                 
                                 type="checkbox"
                                 name="surat"
                                 checked={filters1.surat}
                                 onChange={handleCheckboxChange}
                             
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                              
                                  className="ml-3 text-sm text-gray-600"
                                >
                                Surat
                                </label>
                              </div>
                              </div>

                              <div className="space-y-4">
                              <div  className="flex items-center">
                                <input
                                 
                                 type="checkbox"
                                 name="baroda"
                                 checked={filters1.baroda}
                                 onChange={handleCheckboxChange}
                             
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                              
                                  className="ml-3 text-sm text-gray-600"
                                >
                                Baroda
                                </label>
                              </div>
                              </div>
                          
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>

                  {/* Sidebar */}
                  <form className="hidden lg:block">
                    {/* City filters */}
                    {/* Your existing city filter code */}
                    
                    {/* Sorting option */}
                    <Disclosure as="div" className="border-b border-gray-200 py-6">
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">Sort by Price</span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                  <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              {/* Add checkboxes for sorting options */}
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  name="priceHighToLow"
                                  checked={sortBy === 'priceHighToLow'}
                                  onChange={() => handleSortChange('priceHighToLow')}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  Price: High to Low
                                </label>
                              </div>
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  name="priceLowToHigh"
                                  checked={sortBy === 'priceLowToHigh'}
                                  onChange={() => handleSortChange('priceLowToHigh')}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  Price: Low to High
                                </label>
                              </div>
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  name="newest"
                                  checked={sortBy === 'newest'}
                                  onChange={() => handleSortChange('newest')}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />

                                <label
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  Newest
                                </label>
                              </div>
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </form>

              </form>
              <div className="lg:col-span-3">
              <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2 justify-center bg-gray-100 px-2 py-4 overflow-y-auto'>
                    {currentItems.length === 0 && <div>No products to display</div>}
                    {currentItems.map(product => (
                        <div key={product.ProductID} className="m-4">
                            <div className="w-50 p-4 bg-white rounded-xl shadow-xl hover:shadow-gray-500 hover:shadow-2xl transform duration-500">
                              {/* wishlist */}
                              <div className="heart-icon absolute top-0 right-0 p-2" onClick={() => toggleWishlist(product.ProductID)}>
                                    <FaRegHeart className={wishlist.includes(product.ProductID) ? "text-red-500" : "text-gray-500"} />
                              </div>
                            {/* end wishlist */}
                                <Link to={`/product/${product.ProductID}`} style={{ textDecoration: 'none', color: 'inherit' }}>

                                    <img className='w-full h-64 p-1 object-cover rounded-t-md' src={product.ProductImgs[0]} alt='not found' />
                                    <div className="mt-4">
                                        <h3 className="text-2xl font-bold text-gray-700">{product.ProductName}</h3>
                                        <p className="block text-xl font-semibold text-gray-700 cursor-auto ">₹{product.ProductPrice}.00</p>
                                        <p className="text-gray-700 mt-2">{product.ProductDes.split(' ').slice(0, 10).join(' ')}... <Link to={`/product/${product.ProductID}`} className="text-blue-500">View More</Link></p>

                                        <br></br>
                                        <hr></hr>
                                        <div className='mt-4 mb-2 flex justify-between pl-4 pr-2'>
                                            {product.TransactionType === 'sell' && (
                                                <button onClick={handleSellRentClick} className='text-lg block font-semibold py-2 px-6 text-green-100 hover:text-white bg-green-400 rounded-lg shadow hover:shadow-md transition duration-300'>Sell</button>
                                            )}
                                            {product.TransactionType === 'rent' && (
                                                <button onClick={handleSellRentClick} className='text-lg block font-semibold py-2 px-6 text-green-100 hover:text-white bg-green-400 rounded-lg shadow hover:shadow-md transition duration-300'>Rent</button>
                                            )}
                                            {product.TransactionType === 'both' && (
                                                <>
                                                    <button onClick={handleSellRentClick} className='text-lg block font-semibold py-2 px-6 text-green-100 hover:text-white bg-green-400 rounded-lg shadow hover:shadow-md transition duration-300'>Rent</button>
                                                    <button onClick={handleSellRentClick} className='text-lg block font-semibold py-2 px-6 text-green-100 hover:text-white bg-green-400 rounded-lg shadow hover:shadow-md transition duration-300'>Sell</button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </Link>

                            </div>
                        </div>
                    ))}
                </div>
                
              </div>
                    
              {/* Pagination */}
                <div className="flex justify-center mt-1 space-x-1 sm:space-x-2 lg:justify-end items-center p-1">
                    {/* Previous Page Button */}
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-1 mx-1 ${currentPage === 1 ? "text-gray-500 cursor-not-allowed" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} focus:outline-none focus:ring focus:border-blue-300`}
                    >
                        &laquo;
                    </button>

                    {/* Page Number Buttons */}
                    {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`px-3 py-1 mx-1 ${currentPage === index + 1 ? "bg-blue-100 text-black shadow-lg" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} focus:outline-none focus:border-blue-300`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    {/* Next Page Button */}
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredProducts.length / itemsPerPage)))}
                        disabled={currentPage === Math.ceil(filteredProducts.length / itemsPerPage)}
                        className={`px-4 py-1 mx-1 ${currentPage === Math.ceil(filteredProducts.length / itemsPerPage) ? "text-gray-500 cursor-not-allowed" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} focus:outline-none focus:ring focus:border-blue-300`}
                    >
                        &raquo;
                    </button>
                </div>

                {/* pagination ends */}
            </div>
          </section>
        </main>
        <div>
      </div>
    </div>
               
            
       <Footer />
        </div>
    );
}
export default ElectronicsPage;
