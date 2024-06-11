import "../../App.css";
import { FaLock } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from '../../../config'; // Import your Firebase authentication instance

function ConfirmPassword() {

  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { id, token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Confirm the password reset with Firebase Authentication
      await auth.confirmPasswordReset(token, password);

      // Password reset successful, navigate to login page
      navigate('/login');
    } catch (error) {
      console.error("Error confirming password reset:", error.message);
      // Handle error, show error message to user
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
            New User?{" "}
            <span
              id="signupButton"
              className="pl-1 text-blue-400 cursor-pointer"
            >
              SignUp
            </span>
          </p>
        </div>
      </div>

      <div className="hero-section flex items-center justify-evenly h-full">
        <div className="hero-left flex-1 flex justify-center items-center">
          <div
            style={{ borderColor: "#B7D3DF" }}
            className="border-4 border-slate-400 p-14 pb-10 rounded-md shadow-slate-700 shadow-2xl"
          >
            <div className="mb-10">
              <h2 style={{ color: "#393E46" }} className="text-3xl font-bold">
                Create New Password
              </h2>
              <p
                style={{ color: "#393E46", fontSize: "15px" }}
                className="text-xl"
              >
                Set a strong password to secure your account{" "}
              </p>
            </div>
            <div
              style={{ borderColor: "#B4D4FF" }}
              className="flex items-center mb-4 bg-white p-4 border-1 rounded-md"
            >
              <FaLock
                style={{ color: "#B7D3DF" }}
                className="text-slate-400 text-2xl"
              />
              <input
                className="outline-none w-full px-5"
                type="password"
                placeholder="Enter New Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className=" flex items-center gap-10 ">
            <Link to={"/login"}>
              <button className=" bg-slate-200 px-8 py-3 rounded-lg font-bold hover:bg-slate-400 hover:text-white text-slate-500 duration-300 border-2 border-slate-400  "
              onClick = {handleSubmit}>
                SUBMIT
              </button>
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPassword;
