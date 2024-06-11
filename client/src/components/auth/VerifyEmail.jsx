import { Link } from "react-router-dom";
import "../../App.css";
import { FaEnvelope } from "react-icons/fa";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth"; // Import Firebase Authentication modules
import { auth } from '../../../config'; // Import Firebase auth

function VerifyEmail() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send password reset email using Firebase Authentication
      await sendPasswordResetEmail(auth, email); // Use the 'email' state here
      // Password reset email sent successfully
      toast.success("Password reset email sent successfully");
      navigate('/login');
    } catch (error) {
      console.error("Error during password reset:", error);
      toast.error("Failed to send reset email");
    } finally {
      setLoading(false);
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
                Verify your Email
              </h2>
              <p
                style={{ color: "#393E46", fontSize: "15px" }}
                className="text-xl"
              >
                We will send you the One Time Password(OTP) on this email
              </p>
            </div>
            <div
              style={{ borderColor: "#B4D4FF" }}
              className="flex items-center mb-10 bg-white p-4 border-1 rounded-md"
            >
              <FaEnvelope
                style={{ color: "#B7D3DF" }}
                className="text-slate-400 text-2xl"
              />
              <input
                className="outline-none w-full px-5"
                type="email"
                placeholder="Enter Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className=" flex items-center gap-10 ">
              <button 
                className=" bg-slate-200 px-8 py-3 rounded-lg font-bold hover:bg-slate-400 hover:text-white text-slate-500 duration-300 border-2 border-slate-400  "
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Resetting Password..." : "Reset Password"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default VerifyEmail;
