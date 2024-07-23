import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaStar } from 'react-icons/fa';
import Navbar from '../components/Navbar';

const mockProducts = [
    {
        id: 1,
        name: 'Johnnie Walker Black Label',
        image: 'https://wallpapercave.com/wp/wp1834487.jpg',
        category: 'Whiskey',
        brand: 'Johnnie Walker',
        price: 59.99,
        description: 'A premium blended Scotch whisky.',
        featured: false,
    },
    {
        id: 2,
        name: 'Smirnoff Vodka',
        image: 'https://wallpapercave.com/wp/wp1834487.jpg',
        category: 'Vodka',
        brand: 'Smirnoff',
        price: 24.99,
        description: 'A classic vodka with a smooth taste.',
        featured: false,
    },
    // Add more mock products as needed
];

const FeaturedProducts = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState(mockProducts);

    const toggleFeatured = (id) => {
        setProducts(products.map((product) =>
            product.id === id
                ? { ...product, featured: !product.featured }
                : product
        ));
    };

    return (
        <>
            <Navbar />
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="flex items-center mb-4">
                    <button
                        onClick={() => navigate('/all-products')}
                        className="text-black hover:text-gray-700 focus:outline-none mb-[10px]"
                    >
                        <FaArrowLeft size={24} />
                    </button>
                    <h1 className="text-2xl font-bold mb-4 ml-4">Featured Products</h1>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 mx-auto max-w-4xl">
                    <ul className="space-y-4">
                        {products.map((product) => (
                            <li key={product.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border border-gray-300 rounded-md">
                                <div className="flex flex-col items-center w-full md:w-auto">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full md:w-48 h-auto object-cover rounded-md"
                                    />
                                    <div className="mt-4 flex-1 text-center md:text-left">
                                        <h2 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h2>
                                        <p className="text-sm text-gray-600">Category: {product.category}</p>
                                        <p className="text-sm text-gray-600">Brand: {product.brand}</p>
                                        <p className="text-sm text-gray-600">Price: ${product.price.toFixed(2)}</p>
                                    </div>
                                    <button
                                        onClick={() => toggleFeatured(product.id)}
                                        className={`mt-4 px-4 py-2 rounded-md text-white ${product.featured ? 'bg-yellow-600' : 'bg-gray-600'} hover:bg-yellow-700 focus:outline-none text-sm md:text-base`}
                                    >
                                        {product.featured ? 'Remove Featured' : 'Add Featured'}
                                        <FaStar className="inline ml-2" />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default FeaturedProducts;
