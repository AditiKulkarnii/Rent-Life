import React, { createContext, useState, useEffect } from 'react';

// Create a context for the wishlist
export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        // Save wishlist to localStorage whenever it changes
        sessionStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);
    
    useEffect(() => {
        // Load wishlist from localStorage
        const savedWishlist = JSON.parse(sessionStorage.getItem('wishlist')) || [];
        setWishlist(savedWishlist);
    }, []);
    

    const toggleWishlistItem = (productId) => {
        setWishlist(prevWishlist => {
            if (prevWishlist.includes(productId)) {
                return prevWishlist.filter(id => id !== productId);
            } else {
                return [...prevWishlist, productId];
            }
        });
    };

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlistItem }}>
            {children}
        </WishlistContext.Provider>
    );
};

