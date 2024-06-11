import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../config'; 
import { FiLogOut } from 'react-icons/fi'; 
import {useState} from "react";
import firebase from 'firebase/compat/app';
import { toast } from "react-toastify";

const UserHeader = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const handleLogout = () => {
    firebase.auth().signOut().then(() => {
      localStorage.removeItem('userInfo');
      setIsLoggedIn(false);
      //toast.success("Logout successful..!!", { autoClose: 1200 });
    }).catch((error) => {
      console.error('Logout error:', error);
      toast.error("Error in logout..!!", { autoClose: 1200 });
    });
    navigate('/')
  };

  return (
    <div>
      <header className="z-40 py-4 bg-gray-800">
        <div className="flex items-center justify-between h-8 px-6 mx-auto">
          {/* Logo */}
          <a href="/" className="flex items-center"> {/* Added flex and items-center classes */}
            {/* <img src="/path/to/logo.png" alt="Logo" className="h-8" /> */}
            {/* <span className="text-white text-lg ml-2">Your Site Name</span> */} {/* Uncomment and replace "Your Site Name" with your site name */}
          </a>

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

export default UserHeader;
