import { BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.css";
import Aboutus from "../src/components/Aboutus.jsx";
import Footer from "../src/components/Footer1.jsx";
import Review from "../src/components/Review.jsx";
import Login from "../src/components/auth/Login.jsx";
import SignUp from "../src/components/auth/Signup.jsx";
import VerifyEmail from "../src/components/auth/VerifyEmail.jsx";
import ConfirmPassowrd from "../src/components/auth/ConfirmPassword.jsx";
import AdminPage from "./components/Amin/AdminPage.jsx";
import Home from "../src/components/Home.jsx";
import ImageSlider from "./components/ImageSlider.jsx";
import Card from "./components/Card.jsx";
import Furniture from "./components/Products/Furniture.jsx";
import Housing from "./components/Products/Housing.jsx";
import Vehicles from "./components/Products/Vehicles.jsx";
import Music from "./components/Products/Music.jsx";
import AddProduct from "./components/AddProduct.jsx";
import { ProductsContextProvider } from "./components/Products/ProductsContext.jsx";
import Products from "./components/Products/Products.jsx";
import ElectronicsPage from "./components/Products/ElectronicsPage.jsx";
import { UserContextProvider } from "./components/UserContext.jsx";
import ProductPage from "./components/Products/ProductPage.jsx";
import DemoAdmin from "./components/Amin/DemoAdmin.jsx";
import Aside from "./components/Amin/Aside.jsx";
import AdminHeader from "./components/Amin/AdminHeader.jsx";
import Content from "./components/Amin/Content.jsx";
import AllProduct from "./components/Amin/AllProduct.jsx";
import HousePage from "./components/Amin/HousePage.jsx";
import Table from "./components/Amin/Table.jsx";
import AdminRegister from "./components/auth/AdminRegister.jsx";
import AdminLogin from "./components/auth/AdminLogin.jsx";
import Wishlist from "./components/Wishlist.jsx";
import { ToastContainer} from "react-toastify";
import UserHeader from "./components/User/UserHeader.jsx";
import UserAside from "./components/User/UserAside.jsx";
import User from "./components/User/User.jsx";
import UserContent from "./components/User/UserContent.jsx";
import UserProduct from "./components/User/UserProduct.jsx";
import { RegistrationProvider } from "./components/auth/RegistationContext.jsx";
import 'react-toastify/dist/ReactToastify.css';
import UserHouse from "./components/User/UserHouse.jsx";
import HousingPage from "./components/Products/HousingPage.jsx";
import Sidebar from "./components/Products/Sidebar.jsx";
import CheckoutForm from "./components/Products/CheckoutForm.jsx";
import Modal from "./components/Products/Model.jsx";
import { WishlistProvider } from "./components/WishlistContext.jsx";
import UserOrder from "../src/components/User/UserOrder.jsx";

function App() {
 
  return (
    <>
    <ToastContainer />
    <RegistrationProvider>
    <UserContextProvider>
    <ProductsContextProvider>
    <WishlistProvider>
      <BrowserRouter>

            <Routes>
              {/* Admin Dshboard */}
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/checkout" element={<CheckoutForm />} />
              <Route path="/model" element={<Modal />} />



              {/* Pages */}
              <Route path="/" element={<Home />} />
              <Route path="/aboutus" element={<Aboutus />} />

              {/* <Route path="/contactus" element={<Contactus />} /> */}
              <Route path="/review" element={<Review />} />
              <Route path="/addproduct" element={<AddProduct />} />
  

                <Route path="/product" element={<Products />} />
               
                <Route path="/product/:productId" element={<ProductPage />} />

              {/* Login signup */}
              <Route path="/login" exact  element={<Login />} />
              <Route path="/signup" exact  element={<SignUp />} />
              <Route path="/forgetpassword" element={<VerifyEmail />} />
              <Route path="/confirmpassword/:id/:token" element={<ConfirmPassowrd />} />
              <Route path="/adminRegister" element={<AdminRegister />} />
              <Route path="/adminlogin" element={<AdminLogin/>} />

            
              
              {/* header footer */}
              {/* <Route path="/navbar" element={<Navbar />} /> */}
              <Route path="/footer" element={<Footer />} />
              <Route path ="/wishlist" element = {<Wishlist/>}/>
            
              {/* Home Page Content */}
              <Route path="/imageslider" element={<ImageSlider />} />
              <Route path="/card" element={<Card />} />
            
              {/* Products */}
              <Route path="/electronics" element={<ElectronicsPage />} />
              <Route path="/furniture" element={<Furniture />} />
              <Route path="/housing" element={<Housing />} />
              <Route path="/vehicle" element={<Vehicles />} />
              <Route path="/housing/:productId" element={<HousingPage />} />
              <Route path="/music" element={<Music />} />
              <Route path="/sidebar" element={<Sidebar />} />


              {/* extra */}
              <Route path="/demo" element={<DemoAdmin />} />
              <Route path="/aside" element={<Aside />} />
              <Route path="/adminheader" element={<AdminHeader />} />
              <Route path="/content" element={<Content />} />
              <Route path="/all" element={<AllProduct />} />
              <Route path="/house" element={<HousePage />} />

              <Route path="/table" element={<Table />} />

               {/* user */}
               <Route path="/userheader" element={<UserHeader />} />
              <Route path="/usercontent" element={<UserContent />} />
              <Route path="/userproduct" element={<UserProduct />} />
              <Route path="/useraside" element={<UserAside />} />
              <Route path="/user" element={<User />} />
              <Route path="/userhouse" element={<UserHouse />} />
              <Route path = "/orderhistory" element = {<UserOrder/>} />

            
            </Routes>
          </BrowserRouter>      
        </WishlistProvider>
       </ProductsContextProvider>
       </UserContextProvider>
       </RegistrationProvider>
       </>
   
  );
}

export default App;
