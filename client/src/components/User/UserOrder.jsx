import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import firebase from 'firebase/compat/app';
import UserAside from './UserAside';
import UserHeader from './UserHeader';

function UserOrder() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const currentUser = firebase.auth().currentUser;

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = db.collection('orders')
        .where('email', '==', currentUser.email)
        .onSnapshot(snapshot => {
          const ordersData = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
              OrderID: doc.id,
              ProductName: data.product.ProductName,
              ProductImage: data.product.ProductImgs[0],
              date: data.date,
              ProductPrice: data.product.ProductPrice,
              orderedBy: data.email,
              productBy: data.product.Email,
              contact: data.addressInfo.phoneNumber
            };
          });
          setOrders(ordersData);
        });
      return () => unsubscribe();
    }
  }, [currentUser]);

  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handleNextPage = () => {
    if (currentPage * itemsPerPage < orders.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="flex h-screen bg-gray-800">
        {/* Sidebar */}
        <UserAside />

        {/* Main Content */}
        <div className="flex flex-col flex-1 w-full overflow-y-auto">
          <UserHeader />
          <div className="grid mb-4 pb-10 px-8 mx-4 rounded-3xl bg-gray-100 border-4 border-green-400 mr-3">
            <h1 className="text-2xl font-semibold mb-4">Your Orders</h1>
            <br />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-9 justify-center bg-gray-100 px-7 py-8 ml-3">
              {orders.length === 0 && <div>No orders to display</div>}
              {currentOrders.map(order => (
                <div key={order.OrderID} className="bg-white p-4 shadow-md rounded-md mb-8 relative">
                  <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="w-40 h-30">
                      <img
                        src={order.ProductImage}
                        alt="Product Image"
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="flex flex-col flex-grow">
                      <p className="text-lg text-gray-800 font-semibold">
                        {order.ProductName}
                      </p>
                      <p className="text-xs text-gray-600">
                        Date: <span className="font-semibold">{order.date}</span>
                      </p>
                      <p className="text-xs text-gray-600">
                        Ordered by: <span className="font-semibold">{order.orderedBy}</span>
                      </p>
                      <p className="text-xs text-gray-600">
                        Contact: <span className="font-gray-400 font-semibold">{order.contact}</span>
                      </p>
                      <p className="text-xs text-gray-600">
                        Product by: <span className="font-semibold">{order.productBy}</span>
                      </p>
                    </div>
                    <div className="text-gray-800 font-semibold text-sm absolute top-4 right-4">
                      ₹{order.ProductPrice}.00
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage * itemsPerPage >= orders.length}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserOrder;
