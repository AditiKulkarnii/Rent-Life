import React, { createContext, useState, useContext, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Create a registration context
export const RegistrationContext = createContext();

// Custom hook to use the registration context
export const useRegistration = () => useContext(RegistrationContext);

// Registration context provider component
export const RegistrationProvider = ({ children }) => {
    // State to hold registration data
    const [registrationData, setRegistrationData] = useState({
        email: '',
        password: '',
        name: '',
        city: '',
        address: '',
        pincode: '',
        contact: '',
        image: null
    });

    // Function to update registration data
    const updateRegistrationData = (data) => {
        setRegistrationData(prevData => ({
            ...prevData,
            ...data
        }));
    };

    // Function to reset registration data
    const resetRegistrationData = () => {
        setRegistrationData({
            email: '',
            password: '',
            name: '',
            city: '',
            address: '',
            pincode: '',
            contact: '',
            image: null
        });
    };

    // useEffect(() => {
    //     // Fetch registration data from Firestore
    //     const fetchRegistrationData = async () => {
    //         try {
    //             const userId = firebase.auth().currentUser.uid;
    //             const userDoc = await firebase.firestore().collection('Register').doc(userId).get();
    //             if (userDoc.exists) {
    //                 const userData = userDoc.data();
    //                 setRegistrationData(userData);
    //             } else {
    //                 console.log("No registration data found for the current user.");
    //             }
    //         } catch (error) {
    //             console.error('Error fetching registration data:', error);
    //         }
    //     };

    //     // Call the fetchRegistrationData function when the component mounts
    //     fetchRegistrationData();

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []); // Only run this effect once when the component mounts

    return (
        // Provide the registration context value to all children
        <RegistrationContext.Provider value={{ registrationData, updateRegistrationData, resetRegistrationData }}>
            {children}
        </RegistrationContext.Provider>
    );
};
