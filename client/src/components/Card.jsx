import React from "react";
import card from "../assets/images/maincard.png";
import { Link } from "react-router-dom";

function Card() {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center flex-wrap py-20">
      <h1 className="mb-12 text-5xl font-bold text-center w-full text-gray-500">PRODUCTS</h1>

      {/* First Card */}
      <div className="mx-4 mb-12">
        <div className="flex items-center">
          <div className="container mx-auto p-9 bg-white max-w-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300">
            <img
              className="rounded-xl"
              src={card}
              alt="Electronics"
            />
            <div className="flex justify-between items-center">
              <div>
                <h1 className="mt-5 text-2xl font-semibold">Electronics</h1>
                {/* <p className="mt-2 text-gray-600">item</p> */}
              </div>
              <div>
                <Link to={"/electronics"}>
                  <button className="text-white text-md font-semibold bg-green-400 py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110">
                    View More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Card */}
      <div className="mx-4 mb-12">
        <div className="flex items-center">
          <div className="container mx-auto p-9 bg-white max-w-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300">
            <img
              className="rounded-xl"
              src="https://i.pinimg.com/564x/87/7d/87/877d87794e662a3ade7d86f8fa2934a9.jpg"
              alt="Housing"
            />
            <div className="flex justify-between items-center">
              <div>
                <h1 className="mt-5 text-2xl font-semibold">Housing</h1>
                {/* <p className="mt-2 text-gray-600">item</p> */}
              </div>
              <div>
                <Link to={"/housing"}>
                  <button className="text-white text-md font-semibold bg-green-400 py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110">
                    View More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Third Card */}
      <div className="mx-4 mb-12">
        <div className="flex items-center">
          <div className="container mx-auto p-9 bg-white max-w-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300">
            <img
              className="rounded-xl"
              src="https://i.pinimg.com/564x/48/7c/32/487c32f4c9bc787d7d77d33cf79d080b.jpg"
              alt="Furniture"
            />
            <div className="flex justify-between items-center">
              <div>
                <h1 className="mt-5 text-2xl font-semibold">Furniture</h1>
                {/* <p className="mt-2 text-gray-600">item</p> */}
              </div>
              <div>
                <Link to={"/furniture"}>
                  <button className="text-white text-md font-semibold bg-green-400 py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110">
                    View More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fourth Card */}
      <div className="mx-4 mb-12">
        <div className="flex items-center">
          <div className="container mx-auto p-9 bg-white max-w-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300">
            <img
              className="rounded-xl"
              src="https://i.pinimg.com/564x/98/7b/9a/987b9ad35f65dc43bf22af4a3ac10ee1.jpg"
              alt="Musical Instrument"
            />
            <div className="flex justify-between items-center">
              <div>
                <h1 className="mt-5 text-2xl font-semibold">Music</h1>
                {/* <p className="mt-2 text-gray-600">item</p> */}
              </div>
              <div>
                <Link to={"/music"}>
                  <button className="text-white text-md font-semibold bg-green-400 py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110">
                    View More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fifth Card */}
      <div className="mx-4 mb-12">
        <div className="flex items-center">
          <div className="container mx-auto p-9 bg-white max-w-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300">
            <img
              className="rounded-xl"
              src="https://i.pinimg.com/564x/2a/e6/03/2ae60338633a5cf9da17911016406930.jpg"
              alt="Vehicles"
            />
            <div className="flex justify-between items-center">
              <div>
                <h1 className="mt-5 text-2xl font-semibold">Vehicles</h1>
                {/* <p className="mt-2 text-gray-600">item</p> */}
              </div>
              <div>
                <Link to={"/vehicle"}>
                  <button className="text-white text-md font-semibold bg-green-400 py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110">
                    View More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Card;
