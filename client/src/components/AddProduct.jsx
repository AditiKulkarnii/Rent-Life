import React, { useState } from 'react';
import { storage, db } from '../../firebase';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth } from 'firebase/auth';

const AddProduct = () => {
    const auth = getAuth();
    const [email, setEmail] = useState(auth.currentUser ? auth.currentUser.email : '');
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productImgs, setProductImgs] = useState([]);
    const [productDes, setProductDes] = useState('');
    const [productType, setProductType] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [furnished, setFurnished] = useState(false);
    const [error, setError] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const types = ['image/png', 'image/jpeg'];

    console.log(email);
    const productImgHandler = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const validFiles = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            if (types.includes(selectedFiles[i].type)) {
                validFiles.push(selectedFiles[i]);
            } else {
                setError('Please select valid image types (jpg or png)');
                return;
            }
        }

        // Append validFiles to productImgs, ensuring no duplicates and max length of 4
        const newProductImgs = [...productImgs];
        validFiles.forEach(file => {
            if (newProductImgs.length < 4 && !newProductImgs.some(img => img.name === file.name)) {
                newProductImgs.push(file);
            }
        });

        setProductImgs(newProductImgs);
        setError('');
    };

    const addProduct = (e) => {
        e.preventDefault();
        setIsAdding(true);

        if (!productName || !productPrice || !productImgs.length || !productDes || !productType || !transactionType || !email) {
            setError('Please fill in all fields');
            setIsAdding(false);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email');
            setIsAdding(false);
            return;
        }

        db.collection('Register')
            .where('email', '==', email)
            .get()
            .then((querySnapshot) => {
                if (querySnapshot.empty) {
                    setError('Email not registered');
                    setIsAdding(false);
                    return;
                }

                const uploadTasks = productImgs.map((img) => {
                    return storage.ref(`product-images/${img.name}`).put(img);
                });

                Promise.all(uploadTasks)
                    .then((snapshots) => {
                        return Promise.all(snapshots.map((snapshot) => snapshot.ref.getDownloadURL()));
                    })
                    .then((downloadUrls) => {
                        const baseProductData = {
                            ProductName: productName,
                            ProductPrice: Number(productPrice),
                            ProductImgs: downloadUrls,
                            ProductDes: productDes,
                            ProductType: productType,
                            TransactionType: transactionType,
                            Email: email
                        };

                        if (productType === 'housing') {
                            baseProductData.Bathrooms = Number(bathrooms);
                            baseProductData.Bedrooms = Number(bedrooms);
                            baseProductData.Furnished = furnished;
                        }

                        const collection = productType === 'housing' ? 'House' : 'Product';

                        console.log('Product Type:', productType);
                        console.log('Collection:', collection);

                        db.collection(collection)
                            .add(baseProductData)
                            .then(() => {
                                toast.success("Product added successfully", { autoClose: 1200 });
                                setEmail('');
                                setProductName('');
                                setProductPrice(0);
                                setProductImgs([]);
                                setProductDes('');
                                setProductType('');
                                setTransactionType('');
                                setBathrooms('');
                                setBedrooms('');
                                setFurnished(false);
                                setError('');
                                setIsAdding(false);
                            })
                            .catch(err => {
                                setError(err.message);
                                setIsAdding(false);
                            });
                    })
                    .catch((err) => {
                        setError(err.message);
                        toast.error(err.message, { autoClose: 1200 });
                        setIsAdding(false);
                    });
            })
            .catch((error) => {
                setError(error.message);
                toast.error(error.message, { autoClose: 1200 });
                setIsAdding(false);
            });
    };

    return (
        <div>
            <div className="px-32 py-5 h-screen overflow-y-hidden bg-slate-200 overflow-y-scroll">
                <div className="navbar pt-3 flex items-center justify-between px-5">
                    <div className="text-black text-3xl font-bold cursor-pointer">
                        <span className="text-blue-400 font-extrabold text-4xl">Rent-</span>
                        a-Life
                    </div>
                    <div>
                        <Link to={"/"}>
                            <p className="font-bold text-xl">
                                GO
                                <span
                                    id="signupButton"
                                    className="pl-1 text-blue-400 cursor-pointer"
                                >
                                    BACK
                                </span>
                            </p>
                        </Link>
                    </div>
                </div>
                <form onSubmit={addProduct}>
                    <div className="hero-section flex items-center justify-evenly h-full">
                        <div className="hero-left flex-1 flex justify-center items-center">
                            <div
                                style={{ borderColor: "#B7D3DF" }}
                                className="border-4 border-slate-400 p-14 rounded-md shadow-slate-700 shadow-2xl"
                            >
                                <div className="mb-10">
                                    <h2 style={{ color: "#393E46" }} className="text-3xl font-bold">
                                        ADD PRODUCT
                                    </h2>
                                </div>
                                <div
                                    style={{ borderColor: "#B4D4FF" }}
                                    className="flex items-center mb-8 bg-white p-3 border-1 rounded-md"
                                >
                                    <input
                                        className="outline-none w-full px-5"
                                        type="text"
                                        placeholder="Enter Registered Email"
                                        onChange={(e) => setEmail(e.target.value)} value={email}
                                        disabled={isAdding}
                                        required
                                    />
                                </div>
                                <div
                                    style={{ borderColor: "#B4D4FF" }}
                                    className="flex items-center mb-4 bg-white p-3 border-1 rounded-md"
                                >
                                    <input
                                        className="outline-none w-full px-5"
                                        type="text"
                                        placeholder="Enter Product Name"
                                        onChange={(e) => setProductName(e.target.value)} value={productName}
                                        disabled={isAdding}
                                        required
                                    />
                                </div>
                                <div
                                    style={{ borderColor: "#B4D4FF" }}
                                    className="flex items-center mb-4 bg-white p-3 border-1 rounded-md"
                                >
                                    <input
                                        className="outline-none w-full px-5"
                                        type="number"
                                        placeholder="Enter Product Price"
                                        onChange={(e) => setProductPrice(e.target.value)} value={productPrice}
                                        disabled={isAdding}
                                        required
                                    />
                                </div>
                                <div
                                    style={{ borderColor: "#B4D4FF" }}
                                    className="flex items-center mb-4 bg-white p-3 border-1 rounded-md"
                                >
                                    <textarea
                                        onChange={(e) => setProductDes(e.target.value)} value={productDes}
                                        className="outline-none w-full px-5"
                                        type="text"
                                        placeholder="Enter Product Description"
                                        disabled={isAdding}
                                        required
                                    />
                                </div>
                                <div
                                    style={{ borderColor: "#B4D4FF" }}
                                    className="flex items-center mb-4 bg-white p-3 border-1 rounded-md"
                                >
                                    <select className='form-control' onChange={(e) => setProductType(e.target.value)} value={productType} placeholder="Select Product Type" disabled={isAdding}>
                                        <option>Select Product Type</option>
                                        <option value="electronics">Electronics</option>
                                        <option value="housing">Housing</option>
                                        <option value="vehicle">Vehicle</option>
                                        <option value="musical instrument">Musical Instrument</option>
                                        <option value="furniture">Furniture</option>
                                    </select>
                                </div>
                                {productType === 'housing' && (
                                    <>
                                        <div
                                            style={{ borderColor: "#B4D4FF" }}
                                            className="flex items-center mb-4 bg-white p-3 border-1 rounded-md"
                                        >
                                            <input
                                                className="outline-none w-full px-5"
                                                type="number"
                                                placeholder="Enter Number of Bathrooms"
                                                onChange={(e) => setBathrooms(e.target.value)}
                                                value={bathrooms}
                                                disabled={isAdding}
                                                required
                                            />
                                        </div>
                                        <div
                                            style={{ borderColor: "#B4D4FF" }}
                                            className="flex items-center mb-4 bg-white p-3 border-1 rounded-md"
                                        >
                                            <input
                                                className="outline-none w-full px-5"
                                                type="number"
                                                placeholder="Enter Number of Bedrooms"
                                                onChange={(e) => setBedrooms(e.target.value)}
                                                value={bedrooms}
                                                disabled={isAdding}
                                                required
                                            />
                                        </div>
                                        <div
                                            style={{ borderColor: "#B4D4FF" }}
                                            className="flex items-center mb-4 bg-white p-3 border-1 rounded-md"
                                        >
                                            <div>Furnished: </div>
                                            <div style={{ marginLeft: '10px' }}>
                                                <input
                                                    type="radio"
                                                    id="furnished"
                                                    name="furnished"
                                                    value="true"
                                                    checked={furnished === true}
                                                    onChange={() => setFurnished(true)}
                                                    disabled={isAdding}
                                                />
                                                <label htmlFor="furnished">Yes</label>
                                            </div>
                                            <div style={{ marginLeft: '10px' }}>
                                                <input
                                                    type="radio"
                                                    id="notFurnished"
                                                    name="furnished"
                                                    value="false"
                                                    checked={furnished === false}
                                                    onChange={() => setFurnished(false)}
                                                    disabled={isAdding}
                                                />
                                                <label htmlFor="notFurnished">No</label>
                                            </div>
                                        </div>
                                    </>
                                )}
                                <div
                                    style={{ borderColor: "#B4D4FF" }}
                                    className="flex items-center mb-4 bg-white p-3 border-1 rounded-md"
                                >
                                    <div>Transaction Type: </div>
                                    <div style={{ marginLeft: '10px' }}>
                                        <input
                                            type="radio"
                                            id="sell"
                                            name="transactionType"
                                            value="sell"
                                            checked={transactionType === 'sell'}
                                            onChange={() => setTransactionType('sell')}
                                            disabled={isAdding}
                                        />
                                        <label htmlFor="sell">Sell</label>
                                    </div>
                                    <div style={{ marginLeft: '10px' }}>
                                        <input
                                            type="radio"
                                            id="rent"
                                            name="transactionType"
                                            value="rent"
                                            checked={transactionType === 'rent'}
                                            onChange={() => setTransactionType('rent')}
                                            disabled={isAdding}
                                        />
                                        <label htmlFor="rent">Rent</label>
                                    </div>
                                    <div style={{ marginLeft: '10px' }}>
                                        <input
                                            type="radio"
                                            id="both"
                                            name="transactionType"
                                            value="both"
                                            checked={transactionType === 'both'}
                                            onChange={() => setTransactionType('both')}
                                            disabled={isAdding}
                                        />
                                        <label htmlFor="both">Both</label>
                                    </div>
                                </div>
                                <div
                                    style={{ borderColor: "#B4D4FF" }}
                                    className="flex items-center mb-8 bg-white p-3 border-1 rounded-md"
                                >
                                    <input 
                                        type="file" 
                                        id="file" 
                                        required 
                                        multiple
                                        onChange={productImgHandler}
                                        disabled={isAdding}
                                    />
                                </div>
                                {productImgs.map((img, index) => (
                                    <div key={index} className="flex items-center mb-4 bg-white p-3 border-1 rounded-md">
                                        <span>Image {index + 1}:</span>
                                        <img src={URL.createObjectURL(img)} alt={`Image ${index + 1}`} className="ml-2 w-20 h-20" />
                                    </div>
                                ))}
                                <div className="flex items-center gap-10">
                                    <button
                                        type="submit"
                                        className="bg-slate-200 px-8 py-3 rounded-lg font-bold hover:bg-slate-400 hover:text-white text-slate-500 duration-300 border-2 border-slate-400"
                                        disabled={isAdding}
                                    >
                                        {isAdding ? "ADDING..." : "ADD PRODUCT"}
                                    </button>
                                </div>
                                {error && <p className="text-red-500">{error}</p>}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
