import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaEye } from 'react-icons/fa'; // Importing icons from react-icons
import Navbar from '../components/Navbar';


const AllProducts = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    return (
        <>
            <Navbar />
            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-2xl font-bold mb-4">All Products</h1>
                <div className="bg-white shadow-md rounded-lg p-6 mb-4">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div className="bg-white shadow-md rounded-lg p-6">
                    {products.length === 0 ? (
                        <p>No products found.</p>
                    ) : (
                        <ul className="space-y-4">
                            {products.map((product) => (
                                <li key={product.id} className="border-b pb-4 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full sm:w-32 h-32 object-contain rounded-md mb-4 sm:mb-0"
                                    />
                                    <div className="flex-1">
                                        <p className="font-bold text-lg">{product.name}</p>
                                        <p className="text-sm text-gray-600">Category: {product.category}</p>
                                        <p className="text-sm text-gray-600">Brand: {product.brand}</p>
                                        <p className="text-sm text-gray-600">Price: ${product.price.toFixed(2)}</p>
                                        <p className="text-sm text-gray-700 mt-2">{product.description}</p>
                                    </div>
                                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                                        <Link
                                            to={`/edit-product/${product.id}`}
                                            className="flex items-center px-2 py-1 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 text-sm"
                                        >
                                            <FaEye className="mr-2" /> View
                                        </Link>
                                        <button
                                            className="flex items-center px-2 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 text-sm"
                                            onClick={() => console.log('Feature Product', product.id)}
                                        >
                                            <FaStar className="mr-2" />Add Featured
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
};

export default AllProducts;
