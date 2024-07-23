import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Navbar from '../components/Navbar';

const liquorCategories = [
    'Whiskey',
    'Vodka',
    'Rum',
    'Gin',
    'Tequila',
    'Liqueurs',
    'Others',
];

const liquorBrands = [
    'Johnnie Walker',
    'Smirnoff',
    'Bacardi',
    'Bombay Sapphire',
    'Patrón',
    'Baileys',
    'Others',
];

const mockProducts = [
    {
        id: 1,
        name: 'Johnnie Walker Black Label',
        image: 'https://wallpapercave.com/wp/wp1834487.jpg',
        category: 'Whiskey',
        brand: 'Johnnie Walker',
        price: 59.99,
        description: 'A premium blended Scotch whisky.',
    },
    {
        id: 2,
        name: 'Smirnoff Vodka',
        image: 'https://wallpapercave.com/wp/wp1834487.jpg',
        category: 'Vodka',
        brand: 'Smirnoff',
        price: 24.99,
        description: 'A classic vodka with a smooth taste.',
    },
    // Add more mock products as needed
];

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        category: '',
        brand: '',
        price: '',
        description: '',
    });
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        const product = mockProducts.find((p) => p.id === parseInt(id));
        if (product) {
            setFormData(product);
            setImagePreview(product.image);
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit the form data to the server or handle it as needed
        console.log('Updated Product Data:', formData);
    };

    return (
        <>
            <Navbar />
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="flex items-center mb-4" >
                    <button
                        onClick={() => navigate('/all-products')}
                        className="text-black hover:text-gray-700 focus:outline-none text-center mb-[10px]"
                    >
                        <FaArrowLeft size={24} />
                    </button>
                    <h1 className="text-2xl font-bold mb-4 ml-4">Edit Product</h1>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Product Image</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="mt-1"
                            />
                            {imagePreview && (
                                <div className="mt-4">
                                    <img src={imagePreview} alt="Product Preview" className="w-full max-w-xs h-auto object-cover rounded-md" />
                                </div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            >
                                <option value="">Select a Category</option>
                                {liquorCategories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
                            <select
                                id="brand"
                                name="brand"
                                value={formData.brand}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            >
                                <option value="">Select a Brand</option>
                                {liquorBrands.map((brand) => (
                                    <option key={brand} value={brand}>{brand}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                rows="4"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditProduct;
