import React, { useState, useEffect, useContext } from "react";
import { db } from "../../firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer1";
import firebase from "firebase/compat/app";
import { UserContext } from "../components/UserContext";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";

function Wishlist() {
  const [wishlistedProducts, setWishlistedProducts] = useState([]);
  const [userId, setUserId] = useState(null);
  const { currentUser } = useContext(UserContext); 

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      setUserId(currentUser.uid);
    } else {
      console.error('No user is currently logged in.');
    }
  }, [currentUser]);

  useEffect(() => {
    if (userId) {
      const fetchWishlistProducts = async () => {
        try {
          const response = await fetch(`/api/wishlist/getAllWishlist?userId=${userId}`);
          const data = await response.json();
          if (data.success) {
            setWishlistedProducts(data.products);
          }
        } catch (error) {
          console.error('Error fetching wishlist products:', error);
        }
      };
      fetchWishlistProducts();
    }
  }, [userId]);

  const saveWishlistToLocalStorage = (wishlist) => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  };

  const removeFromWishlist = async (productId) => {
    try {
      const response = await fetch("/api/wishlist/deleteFromWishlist", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          productId: productId,
        }),
      });

      if (response.ok) {
        const updatedWishlist = wishlistedProducts.filter((id) => id !== productId);
        setWishlistedProducts(updatedWishlist);
        saveWishlistToLocalStorage(updatedWishlist);
        toast.success("Product removed", { autoClose: 800 });
      } else {
        console.error("Failed to remove product from wishlist");
      }
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      if (wishlistedProducts.includes(productId)) {
        toast.error("Product already in wishlist");
        return;
      }

      const response = await fetch("/api/wishlist/addToWishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          productId: productId,
        }),
      });

      if (response.ok) {
        const updatedWishlist = [...wishlistedProducts, productId];
        setWishlistedProducts(updatedWishlist);
        saveWishlistToLocalStorage(updatedWishlist);
        toast.success("Product added to wishlist");
      } else {
        console.error("Failed to add product to wishlist");
      }
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
    }
  };

  return (
    <div className="bg-gray-100 ">
      <Navbar />
      <div className="wishlist-container justify-center bg-gray-100 mt-3">
        <p className="text-blue-900 text-xl font-extrabold text-center ">My Wishlist</p>
        {wishlistedProducts.length === 0 ? (
          <p>Wishlist is empty</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 justify-center bg-gray-100 px-4 py-8">
            {wishlistedProducts.map((productId) => (
              <WishlistItem
                key={productId}
                productId={productId}
                removeFromWishlist={removeFromWishlist}
                wishlistedProducts={wishlistedProducts}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function WishlistItem({ productId, removeFromWishlist, wishlistedProducts }) {
  const [product, setProduct] = useState(null);
  const [ownerName, setOwnerName] = useState("");
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        let productData;
  
        const productDoc = await db.collection('Product').doc(productId).get();
        productData = productDoc.data();
  
        if (!productData) {
          const houseDoc = await db.collection('House').doc(productId).get();
          productData = houseDoc.data();
        }
  
        if (productData) {
          setProduct(productData);
        } else {
          console.log('Product not found');
        }
      } catch (error) {
        console.error(`Error fetching product details for ${productId}:`, error);
      }
    };
    fetchProductDetails();
  }, [productId]);

  useEffect(() => {
    const isInWishlist = checkIfInWishlist(productId);
    setInWishlist(isInWishlist);
  }, [wishlistedProducts]);

  const checkIfInWishlist = (productId) => {
    return wishlistedProducts.includes(productId);
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-md mb-4">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="w-28 h-28">
          <img
            src={product?.ProductImgs[0]}
            alt="Product Image"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div className="flex flex-col flex-grow">
          <p className="text-lg text-gray-800 font-semibold">
            {product?.ProductName}
          </p>
          <p className="text-xs text-gray-600">
            Transaction Type: <span className="font-semibold">{product?.TransactionType}</span>
          </p>
          <p className="text-xs text-gray-600">
            Owner: <span className="font-semibold">{ownerName}</span>
          </p>
        </div>
        <div className="text-gray-800 font-semibold text-xl self-center">
          ₹{product?.ProductPrice}.00
        </div>
        <div className="self-center">
          <button onClick={() => removeFromWishlist(productId)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 ${inWishlist ? 'text-red-500' : 'text-gray-500'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
