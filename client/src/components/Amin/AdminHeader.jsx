import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../../config';
import { FiLogOut } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { db } from '../../../firebase'; // Import db from firebase

const AdminHeader = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]); // Define products state variable
  const [searchResults, setSearchResults] = useState([]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success("logged out.!",{autoClose:1000});
      console.log("logged out");
      navigate('/'); // Redirect to homepage after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

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
  const filterProducts = () => {
    return products.filter(product =>
      product.ProductName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Function to handle search input change
  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
    if (event.target.value !== '') {
      // Update search results based on filtered products
      setSearchResults(filterProducts());
    } else {
      // Reset search results when search query is empty
      setSearchResults([]);
    }
  };

  return (
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
              onChange={handleSearchChange}
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
  );
};

export default AdminHeader;
