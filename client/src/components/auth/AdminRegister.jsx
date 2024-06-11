import "../../App.css";
import { FaUser } from "react-icons/fa";
import React, { useState } from 'react';
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminRegister() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Create user with email and password
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);

            // Get user ID
            const userId = userCredential.user.uid;

            // Store additional details in Firestore
            await firebase.firestore().collection('Admin').doc(userId).set({
                name,
                email,
                contact
            });

            // Registration successful
            console.log('Registration successful');
            window.location('/');

            // Reset form fields
            setEmail('');
            setPassword('');
            setName('');
            setContact('');
        } catch (error) {
            console.error('Registration failed', error);
            // Handle registration errors
        }
    };

    return (
    <div className="px-32 py-5 h-screen overflow-y-hidden bg-slate-200">
      <div className="navbar pt-3 flex items-center justify-between px-5">
        <div className="text-black text-3xl font-bold cursor-pointer">
          <span className="text-blue-400 font-extrabold text-4xl">Rent-</span>
          a-Life
        </div>
        <div>
          <p className="font-bold text-xl">
            Already have an account?{" "}
            <span
              id="signupButton"
              className="pl-1 text-blue-400 cursor-pointer"
            >
            Login
            </span>
          </p>
        </div>
      </div>
        <div className="flex justify-center items-center h-screen">
            
                <form onSubmit={handleRegister}>
                <div className="hero-section flex items-center justify-evenly h-full">
          <div className="hero-left flex-1 flex justify-center items-center">
            <div
              style={{ borderColor: "#B7D3DF" }}
              className="border-4 border-slate-400 p-14 rounded-md shadow-slate-700 shadow-2xl"
            >
                    <div className="mb-10">
                    <h2 style={{ color: "#393E46" }} className="text-3xl font-bold">
                            REGISTER
                        </h2>
                    </div>
                    <div className="flex items-center mb-4 bg-white p-3 border-1 rounded-md">
                        <FaUser style={{ color: "#B7D3DF" }} className="text-2xl" />
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="outline-none w-full px-5"
                            type="text"
                            placeholder="Enter FullName"
                            required
                        />
                    </div>
                    <div className="flex items-center mb-4 bg-white p-3 border-1 rounded-md">
                        <FaUser style={{ color: "#B7D3DF" }} className="text-2xl" />
                        <input
                            value={email}
                            className="outline-none w-full px-5"
                            type="email"
                            placeholder="Ex: xyz@gmail.com"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex items-center mb-4 bg-white p-3 border-1 rounded-md">
                        <FaUser style={{ color: "#B7D3DF" }} className="text-2xl" />
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="outline-none w-full px-5"
                            type="password"
                            placeholder="Enter Password"
                            required
                        />
                    </div>

                    <div className="flex items-center mb-4 bg-white p-3 border-1 rounded-md">
                        <FaUser style={{ color: "#B7D3DF" }} className="text-2xl" />
                        <input
                            value={contact}
                            name="contact"
                            onChange={(e) => setContact(e.target.value)}
                            className="outline-none w-full px-5"
                            type="text"
                            placeholder="Enter Contact"
                            required
                        />
                    </div>
                    <div className="">
                        <button
                            type="submit"
                            className="bg-slate-200 px-8 py-3 rounded-lg font-bold hover:bg-slate-400 hover:text-white text-slate-500 duration-300 border-2 border-slate-400"
                        >
                            REGISTER
                        </button>
                    </div>
                    </div>
                    </div>
                </div>

                </form>
                <ToastContainer />
            </div>
        </div>
    
    );
}

export default AdminRegister;
