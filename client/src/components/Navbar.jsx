import { Link } from "react-router-dom";
import "../App.css";
import logo from "../assets/images/MainLogo.png";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from 'react-router-dom';
import Modal from "react-modal";
import "../index.css";
import { toast } from "react-toastify";
import { FaRegHeart } from 'react-icons/fa';
import { db } from '../../firebase';
import firebase from 'firebase/compat/app';

function Navbar() {

  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [products, setProducts] = useState([]);
  const [housingProducts , setHousingProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (storedUserInfo) {
          setUserInfo(storedUserInfo);
          setProfileImageUrl(storedUserInfo.imageUrl);
          setIsLoggedIn(true);
          Modal.setAppElement('#root');
        } else {
          const currentUser = firebase.auth().currentUser;
          if (currentUser) {
            const userInfoSnapshot = await db.collection('Register').where('email', '==', currentUser.email).get();
            const userData = userInfoSnapshot.docs.map(doc => ({
              UserId: doc.id,
              ...doc.data(),
            }));
            setUserInfo(userData[0]);
            setProfileImageUrl(userData[0].imageUrl);
            setIsLoggedIn(true);
            
            Modal.setAppElement('#root');
            localStorage.setItem('userInfo', JSON.stringify(userData[0]));
          } else {
            // navigate('/');
          }
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchUserInfo();
  }, [setUserInfo, navigate]);


  const handleLogout = () => {
    firebase.auth().signOut().then(() => {
      localStorage.removeItem('userInfo');
      setIsLoggedIn(false);
      toast.success("Logged out successfully..!!", { autoClose: 1200 });
      navigate("/");
    }).catch((error) => {
      console.error('Logout error:', error);
      toast.error("Error in logout..!!", { autoClose: 1200 });
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = await db.collection('Product').get();
        const productsData = productsCollection.docs.map(doc => ({
          ProductId: doc.id,
          ...doc.data()
        }));
        const houseCollection = await db.collection('House').get();
        const houseCollectionData = houseCollection.docs.map(doc => ({
          ProductId: doc.id,
          ...doc.data()
        }));
        setProducts(productsData);
        setHousingProducts(houseCollectionData);
        
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();

  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filterProducts = (query) => {
    const filteredProducts = [];
  
    // Filter products from the 'Product' collection
    const productsFilteredByProductCollection = products.filter(product => (
      product.ProductName.toLowerCase().includes(query.toLowerCase())
    ));
  
    // Filter products from the 'House' collection
    const productsFilteredByHouseCollection = housingProducts.filter(product => (
      product.ProductName.toLowerCase().includes(query.toLowerCase())
    ));
  
    // Add filtered products to the array
    filteredProducts.push(...productsFilteredByProductCollection, ...productsFilteredByHouseCollection);
  
    return filteredProducts;
  };
  

  useEffect(() => {
    setSearchResults(filterProducts(searchQuery));
  }, [searchQuery, products]);

  const email = userInfo?.email;

  return (
    <div>
      <nav className=" border-gray-200 bg-[#b1bfddee]">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-8" alt="" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              Rent-a-Life
            </span>
          </a>
          <div className="flex md:order-2">
            <button
              type="button"
              data-collapse-toggle="navbar-search"
              aria-controls="navbar-search"
              aria-expanded="false"
              className="md:hidden  focus:ring-4 focus:ring-white dark:focus:ring-white rounded-lg text-sm p-2.5 me-1 border-white"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-white border border-white rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-[#b1bfddee] dark:border-white dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={searchQuery}
                onChange={handleSearchInputChange}
                placeholder="Search product.."
              />
             {searchQuery && (
                <ul className="search-results absolute w-full z-10 bg-white mt-2 rounded-lg shadow-lg">
                  {searchResults.map(product => (
                    <li key={`${product.ProductId}-${product.ProductType}`}>
                      {product.ProductType === 'housing' ? (
                        <Link to={{ pathname: '/housing', search: `?query=${searchQuery}` }} className="search-result-item block px-4 py-2 text-gray-800 hover:bg-gray-100">
                          <div>{product.ProductName}</div>
                          <div className="text-sm text-gray-500">Housing</div>
                        </Link>
                      ) : product.ProductType === 'musical instruments' ? (
                        <Link to={{ pathname: '/music', search: `?query=${searchQuery}` }} className="search-result-item block px-4 py-2 text-gray-800 hover:bg-gray-100">
                          <div>{product.ProductName}</div>
                          <div className="text-sm text-gray-500">Musical Instruments</div>
                        </Link>
                      ) : (
                        <Link to={{ pathname: `/${product.ProductType}`, search: `?query=${searchQuery}` }} className="search-result-item block px-4 py-2 text-gray-800 hover:bg-gray-100">
                          <div>{product.ProductName}</div>
                          <div className="text-sm text-gray-500">{product.ProductType}</div>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              data-collapse-toggle="navbar-search"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-search"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-search"
          >
            <div className="relative mt-3 md:hidden">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-[#b1bfddee] dark:border-gray-600 dark:placeholder-gray-400 text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0   dark:border-gray-700">
              <Link to={"/"}>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3  text-white rounded md:bg-transparent hover:text-[#535C91] md:p-0 hover:font-bold"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
              </Link>
              <Link to={"/aboutus"}>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3  rounded md:hover:text-[#535C91] md:p-0 text-white  md:dark:hover:bg-transparent hover:font-bold"
                  >
                    About
                  </a>
                </li>
              </Link>
              <li className="relative group">
                <button className="className= block py-2 px-3  rounded  md:hover:text-[#535C91]  md:p-0  text-white  md:dark:hover:bg-transparent hover:font-bold">
                  Products
                </button>
                <ul className="absolute hidden bg-white pt-2 group-hover:block z-10">
                  <li>
                    <Link to={"/electronics"}>
                      <a
                        href="#"
                        className="block px-4 py-2 text-gray-500  md:hover:text-[#535C91] hover:font-bold"
                      >
                        Electronics
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link to={"/housing"}>
                      <a
                        href="#"
                        className="block px-4 py-2 text-gray-500 md:hover:text-[#535C91] hover:font-bold"
                      >
                        Housing
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link to={"/furniture"}>
                      <a
                        href="#"
                        className="block px-4 py-2 text-gray-500 md:hover:text-[#535C91] hover:font-bold"
                      >
                        Furniture
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link to={"/music"}>
                      <a
                        href="#"
                        className="block px-4 py-2 text-gray-500 md:hover:text-[#535C91] hover:font-bold"
                      >
                        Musical Instruments
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link to={"/vehicle"}>
                      <a
                        href="#"
                        className="block px-4 py-2 text-gray-500 md:hover:text-[#535C91] hover:font-bold"
                      >
                        Vehicles
                      </a>
                    </Link>
                  </li>
                </ul>
              </li>
              <Link to={"/review"}>
                <li>
                  <div className="className=block py-2 px-3  rounded  md:hover:text-[#535C91]  md:p-0  text-white  md:dark:hover:bg-transparent hover:font-bold">
                    Reviews
                  </div>
                </li>
              </Link>
            </ul>
          </div>

          <div className="md:order-3 bold rounded px-4 py-2 mx-2 h-full flex items-center">
            {isLoggedIn ? (
              <>
                <Link to="/addproduct">
                <button className="text-white text-md font-semibold bg-[#6d78b5b3] py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110 mr-2">
                    Upload
                  </button>
                </Link>
                <div
                  className="cursor-pointer rounded-full overflow-hidden bg-gray-200 h-10 w-10 flex items-center justify-center shadow-md"
                  onClick={() => setProfileModalOpen(true)}
                  style={{
                    boxShadow: '0 0 10px rgba(0, 0, 255, 0.5)',
                    border: 'none',
                  }}
                >
                  {profileImageUrl ? (
                    <img
                      src={profileImageUrl}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <span className="text-gray-700 text-lg">
                      {email ? email[0].toUpperCase() : ''}
                    </span>
                  )}
                </div>
                {/* Profile Modal */}
                <Modal
                  isOpen={isProfileModalOpen}
                  onRequestClose={() => setProfileModalOpen(false)}
                  contentLabel="Profile Modal"
                  className="modal"
                  overlayClassName="modal-overlay"
                >
                  <div className="modal-content flex flex-col items-center">
                    <div className="flex items-center mb-4">
                      {profileImageUrl && (
                        <img
                          src={profileImageUrl}
                          alt="Profile"
                          className="w-20 h-20 rounded-full mr-4"
                        />
                      )}
                      <div className="flex flex-col">
                        <h2 className="text-xl font-semibold mb-2">{userInfo.name}</h2>
                        <p>{email}</p>
                      </div>
                    </div>
                    {/* Logout and View Details links */}
                    <div className="flex justify-between w-full">
                      <button
                        onClick={handleLogout}
                        className="logout-link text-red-500"
                      >
                        Logout
                      </button>
                      <Link to="/user" className="text-gray-500">
                        View Details
                      </Link>
                    </div>
                  </div>
                </Modal>
                {/* Wishlist Icon */}
                {email && (
                  <Link
                    to="/wishlist"
                    className="py-2 px-2 text-justify text-blue-900 hover:bg-whatsapp hover:text-blue-100 rounded-lg"
                    title="Wishlist"
                  >
                    <FaRegHeart className="w-7 h-7" />
                  </Link>
                )}
              </>
            ) : (
              <div className="flex md:order-2">
                <Link to="/login">
                <button className="text-white text-md font-semibold bg-[#6d78b5b3] py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110">
                    Login
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
