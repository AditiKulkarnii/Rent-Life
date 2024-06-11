import React, { useState } from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'; // Import Firebase Storage
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [contact, setContact] = useState('');
  const [image, setImage] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      
      const userId = userCredential.user.uid;
      console.log("userId:",userId);

      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`product-images/${userId}`);
      await imageRef.put(image);

      const imageUrl = await imageRef.getDownloadURL();

      await firebase.firestore().collection('Register').doc(userId).set({
        name,
        email,
        city,
        address,
        pincode,
        contact,
        imageUrl
      });

      toast.success('Registration successful', { autoClose: 1000 });
      
      setEmail('');
      setPassword('');
      setName('');
      setCity('');
      setAddress('');
      setPincode('');
      setContact('');
      setImage(null);
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="px-32 py-5 h-screen overflow-y-hidden bg-slate-200 overflow-y-scroll ">
      <div className="navbar pt-3 flex items-center justify-between px-5">
        <div className="text-black text-3xl font-bold cursor-pointer">
          <span className="text-blue-400 font-extrabold text-4xl">Rent-</span>
          a-Life
        </div>
        <div>
          <p className="font-bold text-xl">
            Already have an account?{" "}
            <Link to = {"/login"}>
            <span
              id="signupButton"
              className="pl-1 text-blue-400 cursor-pointer"
            >
              SignIn
            </span>
            </Link>
          </p>
        </div>
      </div>
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
              <div
                style={{ borderColor: "#B4D4FF" }}
                className="flex items-center mb-4 bg-white p-3 border-1 rounded-md"
              >
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
              <div
                style={{ borderColor: "#B4D4FF" }}
                className="flex items-center mb-4 bg-white p-3 border-1 rounded-md"
              >
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

              <div
                style={{ borderColor: "#B4D4FF" }}
                className="flex items-center mb-4 bg-white p-3 border-1 rounded-md"
              >
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

              <div
                style={{ borderColor: "#B4D4FF" }}
                className="flex items-center mb-4 bg-white p-3 border-1 rounded-md"
              >
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

              <div
                style={{ borderColor: "#B4D4FF" }}
                className="flex items-center mb-4 bg-white p-3 border-1 rounded-md"
              >
                <FaLock
                  style={{ color: "#B7D3DF" }}
                  className="text-slate-400 text-2xl"
                />
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="outline-none w-full px-5"
                  type="text"
                  placeholder="Enter City"
                />
              </div>

              <div
                style={{ borderColor: "#B4D4FF" }}
                className="flex items-center mb-4 bg-white p-3 border-1 rounded-md"
              >
                <FaUser style={{ color: "#B7D3DF" }} className="text-2xl" />
                <input
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="outline-none w-full px-5"
                  type="text"
                  placeholder="Enter Pincode"
                  required
                />
              </div>

              <div
                style={{ borderColor: "#B4D4FF" }}
                className="flex items-center mb-4 bg-white p-3 border-1 rounded-md"
              >
                <FaUser style={{ color: "#B7D3DF" }} className="text-2xl" />
                <input
                  onChange={handleImageChange}
                  className="outline-none w-full px-5"
                  type="file"
                  required
                />
              </div>

    

              <div
                style={{ borderColor: "#B4D4FF" }}
                className="flex items-center mb-8 bg-white p-3 border-1 rounded-md"
              >
                <FaLock
                  style={{ color: "#B7D3DF" }}
                  className="text-slate-400 text-2xl"
                />
                <textarea
                  value = {address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="outline-none w-full px-5"
                  placeholder="Enter your address"
                ></textarea>
              </div>

              <div className=" flex items-center gap-10 ">
                <button
                  type="submit"
                  className=" bg-slate-200 px-8 py-3 rounded-lg font-bold hover:bg-slate-400 hover:text-white text-slate-500 duration-300 border-2 border-slate-400  "
                  //onClick={handleSubmit}
                  >
                  REGISTER
                </button>
                <br></br>
              </div>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer/>
    </div>
  );

}
export default SignUp;
