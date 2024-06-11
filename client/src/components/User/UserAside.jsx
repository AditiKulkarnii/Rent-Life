import React from 'react'
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
{/* Favicon */}

// import { MdPerson } from 'react-icons/md';
<script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" defer></script>
import logo from '../../assets/images/MainLogo.png'
import { Link } from 'react-router-dom'

const UserAside = () => {

  return (
    <div>
    <aside className="z-20 flex-shrink-0 hidden w-60 pl-2 overflow-y-auto bg-gray-800 md:block justify-center">
    <div>
    <div className="text-white">
      <div className="flex p-2  bg-gray-800">
        <div className="flex py-3 px-2 items-center">
        <a
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-8" alt="" />
           <Link to ="/" > <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              Rent-a-Life
            </span> 
            </Link>
          </a>
        </div>
      </div>
      
      <div>
        <ul className="mt-6 leading-10">
          <li className="relative px-2 py-1 ">
            <a className="inline-flex items-center w-full text-sm font-semibold text-white transition-colors duration-150 cursor-pointer hover:text-green-500" href=" #">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5zM12 14c-3.313 0-6 2.687-6 6h12c0-3.313-2.687-6-6-6z"/>
            </svg>
              <Link to={"/user"}>
              <span className="ml-4">EDIT PROFILE</span>
              </Link>
              
            </a>
          </li>

          <li className="relative px-2 py-1" x-data="{ Open : false  }">
            <div className="inline-flex items-center justify-between w-full text-base font-semibold transition-colors duration-150 text-gray-500  hover:text-yellow-400 cursor-pointer" x-on:click="Open = !Open">
              <span className="inline-flex items-center  text-sm font-semibold text-white hover:text-green-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
                </svg>
               <Link to={'/userproduct'}> <span className="ml-4">PRODUCT DETAILS</span></Link>
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" x-show="!Open" className="ml-1  text-white w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{display: 'none'}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" x-show="Open" className="ml-1  text-white w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{display: 'none'}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div  style={{display: 'none'}}>
              <ul x-transition:enter="transition-all ease-in-out duration-300" x-transition:enter-start="opacity-25 max-h-0" x-transition:enter-end="opacity-100 max-h-xl" x-transition:leave="transition-all ease-in-out duration-300" x-transition:leave-start="opacity-100 max-h-xl" x-transition:leave-end="opacity-0 max-h-0" className="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium  rounded-md shadow-inner  bg-green-400" aria-label="submenu">
                <li className="px-2 py-1 text-white transition-colors duration-150">
                  <div className="px-1 hover:text-gray-800 hover:bg-gray-100 rounded-md">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <a href="#" className="w-full ml-2  text-sm font-semibold text-white hover:text-gray-800">Item
                        1</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </li>

          <li className="relative px-2 py-1" x-data="{ Open : false  }">
            <div className="inline-flex items-center justify-between w-full text-base font-semibold transition-colors duration-150 text-gray-500  hover:text-yellow-400 cursor-pointer" x-on:click="Open = !Open">
              <span className="inline-flex items-center  text-sm font-semibold text-white hover:text-green-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
                  </svg>
                  <Link to={"/userhouse"}>
                    <span className="ml-4">HOUSE DETAILS</span>
                  </Link>                       
              </span>                     
            </div>                        
          </li>

          {/* New Order History Tab */}
                <li className="relative px-2 py-1">
                  <div className="inline-flex items-center justify-between w-full text-base font-semibold transition-colors duration-150 text-gray-500 hover:text-yellow-400 cursor-pointer">
                    <span className="inline-flex items-center text-sm font-semibold text-white hover:text-green-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V8a2 2 0 00-2-2h-3V3H9v3H6a2 2 0 00-2 2v5M7 10h1v4H7v-4zm3 0h1v4h-1v-4zm3 0h1v4h-1v-4zm3 0h1v4h-1v-4z" />
                      </svg>
                      <Link to="/orderhistory">
                        <span className="ml-4">ORDER HISTORY</span>
                      </Link>
                    </span>
                  </div>
                </li>

        </ul>
      </div>
    </div>
  </div>
</aside>
</div>
  )
}

export default UserAside
