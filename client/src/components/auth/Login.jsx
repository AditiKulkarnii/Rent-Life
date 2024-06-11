import firebase from 'firebase/compat/app';
import React from "react";
import { useState,useContext,useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUser,
  FaLock,
} from "react-icons/fa";
import img1 from "../../assets/images/img1.svg";
import "react-toastify/dist/ReactToastify.css";
import {auth, provider} from "../../../config";
import { signInWithPopup } from "firebase/auth";
import {UserContext} from "../UserContext";
import {toast} from 'react-toastify';


function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const [redirect,setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);
  const navigate = useNavigate(); 

  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        setEmail(data.user.email);
        localStorage.setItem("email", data.user.email);
        (userInfo => {
          setUserInfo(userInfo);
          toast.success("login successful..!!",{autoClose:1200});
          setRedirect(true);
          navigate("/");
        });
        window.location = "/";
      })
      .catch((error) => {
        console.error("Google sign-in error:", error);
        toast.error("error in google login..!!", {autoClose:1200});
      });
  };

  if(redirect)
  {
    navigate('/');
  }

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await firebase.auth().signInWithEmailAndPassword(email, password);
  //     const currentUser = firebase.auth().currentUser;
  //     if (currentUser) {
  //       // Set user information in the context
  //       setUserInfo(currentUser);
  //       setRedirect(true);
  //       console.log(redirect);
  //       console.log(currentUser);
  //       // Display success toast
  //       toast.success("Logged in successfully!",{autoClose:1000});
  //       // Navigate to the desired page
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     // Display error toast
  //     toast.error("Login failed. Please check your credentials.");
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        // Set user information in the context
        setUserInfo(currentUser);
        toast.success("Logged in successfully!", { autoClose: 1000 });
        setRedirect(true);
      }
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  if(redirect)
  {
    navigate('/');
  }

  return (
    <div className="px-5 sm:px-10 md:px-20 lg:px-32 py-5 h-screen overflow-y-hidden bg-slate-200">
    <div className="navbar pt-3 flex items-center justify-between px-5">
      <div className="text-black text-2xl sm:text-3xl font-bold cursor-pointer">
        <span className="text-blue-400 font-extrabold text-3xl sm:text-4xl">
          Rent-
        </span>
        a-Life
      </div>
      <div>
        <p className="font-bold text-lg sm:text-xl">
          New User?{" "}
          <Link to={"/signup"}>
            <span
              id="signupButton"
              className="pl-1 text-blue-400 cursor-pointer"
            >
              SignUp
            </span>
          </Link>
        </p>
      </div>
    </div>
    <div className="hero-section flex flex-col sm:flex-row items-center justify-center sm:justify-between h-full">
      
        <div className="hero-right mb-5 sm:mb-0 flex-1 mr-10 md:mr-20 lg:mr-32">
          <img className="w-full" src={img1} alt="" />
        </div>
      
      <div className="hero-left flex-1 flex flex-col justify-center items-center sm:items-start">
        <div
          style={{
            borderColor: "#B7D3DF",
          }}
          className="border-4 p-6 sm:p-14 rounded-md shadow-slate-700 shadow-2xl transition-all duration-500"
        >
          <form onSubmit = {handleLogin}>
            <div className="mb-5 sm:mb-10">
              <h2
                style={{ color: "#393E46" }}
                className="text-xl sm:text-3xl font-bold"
              >
                Welcome Back!
              </h2>
              <p
                style={{ color: "#393E46" }}
                className="font-bold text-lg sm:text-xl"
              >
                Login to continue
              </p>
            </div>
            <div
              style={{ borderColor: "#B4D4FF" }}
              className="flex items-center mb-3 sm:mb-5 bg-white p-3 sm:p-5 border-1 rounded-md"
            >
              <FaUser
                style={{ color: "#B7D3DF" }}
                className="text-xl sm:text-2xl"
              />
              <input
                className="outline-none w-full px-3 sm:px-5"
                type="email"
                value = {email}
                placeholder="Ex: xyz@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div
              style={{ borderColor: "#B4D4FF" }}
              className="flex items-center mb-3 sm:mb-10 bg-white p-3 sm:p-5 border-1 rounded-md"
            >
              <FaLock
                style={{ color: "#B7D3DF" }}
                className="text-lg sm:text-2xl text-slate-400"
              />
              <input
                value = {password}
                className="outline-none w-full px-3 sm:px-5"
                type="password"
                placeholder="Enter the password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3 sm:gap-10">
              <button
                type="submit"
                className="bg-slate-200 px-5 sm:px-8 py-2 sm:py-3 rounded-lg font-bold hover:bg-slate-400 hover:text-white text-sm sm:text-base text-slate-500 duration-300 border-2 border-slate-400"
                onClick={handleLogin}>
                LOGIN
              </button>
              {error && <p className="text-red-500">{error}</p>}


              <h5
                style={{ color: "#393E46" }}
                className="text-sm sm:text-base"
              >
                <Link to={"/forgetpassword"}>
                  <a>Forget Password?</a>
                </Link>
              </h5>
            </div>
            <div className="flex gap-3 sm:gap-10 items-center justify-center sm:justify-start mt-5 sm:mt-10">
              <h2
                style={{ color: "#393E46" }}
                className="text-sm sm:text-base mr-2 font-bold"
              >
                Login with:
              </h2>
            </div>
            <div className='flex justify-center text-blue-600 mt-2'>
             <h3 className='mt-3'><Link to={'/adminlogin'} >Login as Admin</Link></h3> 
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Login;