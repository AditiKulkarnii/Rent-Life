import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../../../firebase';
import Navbar from '../Navbar';
import Footer from '../Footer1';
import Modal from './Model';
import { auth } from '../../../config'; 
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import "../../index.css";


// Function to create the "orders" collection if it doesn't exist
const createOrdersCollection = async () => {
  try {
    // Check if the "orders" collection already exists
    const ordersCollectionRef = db.collection('orders');
    const doc = await ordersCollectionRef.get();

    // If the collection doesn't exist, create it
    if (doc.empty) {
      await ordersCollectionRef.add({
        placeholder: true
      });
      console.log('Collection "orders" created successfully');
    } else {
      console.log('Collection "orders" already exists');
    }
  } catch (error) {
    console.error('Error creating collection "orders":', error);
  }
};

function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [city, setCity] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [images,setImages]=useState([]);
  const navigate = useNavigate();
  
  // Create the "orders" collection when the component mounts
  useEffect(() => {
    createOrdersCollection();
  }, []);

  const handleTransactionType = (type) => {
    setTransactionType(type);
    setShowModal(true);
    // Reset form fields when transaction type changes
    setName('');
    setAddress('');
    setPincode('');
    setPhoneNumber('');
  };


  
  const buyNow = async () => {
    const user = auth.currentUser;
  
    if (!user) {
      return toast.error("Please log in to place an order", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  
    // Check if all fields are filled
    if (name === "" || address === "" || pincode === "" || phoneNumber === "") {
      return toast.error("All fields are required", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  
    // Construct address information
    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };
  
    // Construct order information
    const orderInfo = {
      product: product,
      addressInfo: addressInfo,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      email: user.email,
    };
  
    var options = {
      key:VITE_RAZOR_KEY,
      key_secret: VITE_RAZOR_SECRET,
      amount: parseInt(product.ProductPrice * 100),
      currency: "INR",
      order_receipt: 'order_rcptid_' + name,
      name: "Rent-A-Life",
      description: "for testing purpose",
      handler: async function (response) {
        try {
          // Add order details to the 'orders' collection
          const docRef = await db.collection('orders').add(orderInfo);
          console.log('Order placed successfully with ID: ', docRef.id);
          toast.success('Order Placed Successfully', { autoClose: 1000 });
  
          // Delete the product from the 'Product' collection
          await db.collection('Product').doc(productId).delete();
          navigate('/');
        } catch (error) {
          console.error('Error placing order:', error);
          toast.error('Failed to place order. Please try again later.', { autoClose: 1000 });
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
  
    var pay = new window.Razorpay(options);
    pay.open();
  };
  
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = db.collection('Product').doc(productId);
        const doc = await productRef.get();
        if (doc.exists) {
          const productData = doc.data();
          setProduct(productData);
          setImages(productData.ProductImgs.map(url => ({ original: url, thumbnail: url })));
        } else {
          console.log('No such product!');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productDoc = await db.collection('Product').doc(productId).get();
        const productData = productDoc.data();
        setProduct(productData);

        const ownerEmail = productData.Email; 
        const ownerQuerySnapshot = await db.collection('Register').where('email', '==', ownerEmail).get();
        if (!ownerQuerySnapshot.empty) {
          const ownerData = ownerQuerySnapshot.docs[0].data();
          setOwnerName(ownerData.name); 
          setContactNo(ownerData.contact);
          setProfileImage(ownerData.imageUrl);
          setCity(ownerData.city);
        } else {
          setOwnerName('Owner Name Not Found'); 
        }
      } catch (error) {
        console.error(`Error fetching product details for ${productId}:`, error);
      }
    };

    fetchProductDetails();
  }, [productId]);
  return (
    <div>
      <Navbar />
      {product ? (
        <div>
          <div className="bg-gray-100 bg:blur-2xl py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row -mx-4">
                <div className="md:flex-1 px-4">
                  <ImageGallery
                    items={images}
                    showFullscreenButton={true}
                    showPlayButton={false}
                    autoPlay={true}
                    showThumbnails={true}
                    showBullets={true}
                    showNav={true}
                    slideOnThumbnailHover={true}
                    showModal={false}
                    additionalClassNames="image-gallery"
                    thumbnailPosition="left"
                    renderItem={item => (
                      <div className="image-container">
                        <img src={item.original} alt="Product" />
                      </div>
                    )}
                  />
                </div>
                <div className="md:flex-1 px-4">
                  <h2 className="text-2xl font-bold text-gray-600 mb-2">{product.ProductName}</h2>
                  <p className="text-gray-600 dark:text-gray-600 text-sm mt-1">{city}</p>
                  <br />
                  {transactionType && showModal && (
                    <Modal
                      name={name}
                      address={address}
                      pincode={pincode}
                      phoneNumber={phoneNumber}
                      setName={setName}
                      setAddress={setAddress}
                      setPincode={setPincode}
                      setPhoneNumber={setPhoneNumber}
                      buyNow={buyNow}
                    />
                  )}
                  <div className="flex mb-4">
                    <div className="mr-4">
                      <span className="font-bold text-gray-700 dark:text-gray-600 mb-2">Price:</span>
                      <span className="text-gray-600 dark:text-gray-600 mb-2 ml-2">{product.ProductPrice}.00</span>
                      <div>
                        <br />
                        <p className="font-bold text-gray-700 dark:text-gray-600">Product Description:</p>
                        <p className="text-gray-600 dark:text-gray-600 text-sm mt-3">{product.ProductDes}</p>
                      </div>
                      <div>
                        <br />
                        <div className="flex items-center mt-3">
                          <div
                            className="rounded-full overflow-hidden bg-gray-200 h-10 w-10 flex items-center justify-center shadow-md"
                            style={{
                              boxShadow: '0 0 5px rgba(0, 0, 255, 0.5)',
                              border: 'none',
                            }}
                          >
                            <img className="w-8 h-8 rounded-full" src={profileImage} alt="Owner Profile" />
                          </div>
                          <div>
                            <h2 className="font-bold text-gray-700 dark:text-gray-600 ml-2">{ownerName}</h2>
                            <p className="text-gray-600 dark:text-gray-500 text-sm ml-2">{product.Email}</p>
                          </div>
                        </div>
                        <br />
                        <p className="font-bold text-gray-700 dark:text-gray-700">Contact:</p>
                        <p className="text-gray-600 dark:text-gray-700 text-sm">{contactNo}</p>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              {/* Rent and Sell buttons */}
              <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center mt-4">
                {product.TransactionType === 'sell' && (
                  <div className="w-1/2 px-2">
                    <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700" onClick={() => handleTransactionType('sell')}>
                      Sell
                    </button>
                  </div>
                )}
                {product.TransactionType === 'rent' && (
                  <div className="w-1/2 px-2">
                    <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700" onClick={() => handleTransactionType('rent')}>
                      Rent
                    </button>
                  </div>
                )}
                {product.TransactionType === 'both' && (
                  <>
                    <div className="w-1/2 px-2">
                      <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700" onClick={() => handleTransactionType('sell')}>
                        Sell
                      </button>
                    </div>
                    <div className="w-1/2 px-2">
                      <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600" onClick={() => handleTransactionType('rent')}>
                        Rent
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Footer />
    </div>
  );
}

export default ProductPage;