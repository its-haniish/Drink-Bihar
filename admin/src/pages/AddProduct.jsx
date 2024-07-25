import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import Loading from '../components/Loading'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        category: '',
        brand: '',
        price: '',
        description: '',
    });
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [imagePreview, setImagePreview] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { isAuthenticated, token } = useSelector(state => state.auth);
    const navigate = useNavigate();

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

    const fetchBrandNames = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/fetch-all-brand-names`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const result = await response.json();

            if (result.message === 'Brand names fetched successfully') {
                setBrands(result.data);
                setIsLoading(false);
            } else {
                console.error('Failed to fetch brands');
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error fetching brands:', error);
            setIsLoading(false);
        }
    };

    const fetchCategoryNames = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/fetch-all-category-names`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const result = await response.json();

            if (result.message === 'Category names fetched successfully') {
                setCategories(result.data);
                setIsLoading(false);
            } else {
                console.error('Failed to fetch categories');
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/create-product`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.message === 'Product created successfully') {
                alert('Product added successfully');
                setFormData({
                    name: '',
                    image: '',
                    category: '',
                    brand: '',
                    price: '',
                    description: ''
                });
                setImagePreview('');
                setIsLoading(false);
            } else {
                console.error('Failed to add product');
                alert('Failed to add product');
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Failed to add product');
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!isAuthenticated) {
            return navigate('/')
        } else {
            fetchBrandNames()
            fetchCategoryNames()
        }
    }, [])

    return (
        <>
            <Navbar />
            {isLoading && <Loading />}
            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-2xl font-bold mb-4">Add New Liquor Product</h1>
                <div className="bg-white shadow-md rounded-lg p-6">
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
                                    <img src={imagePreview} alt="Product Preview" className="w-32 h-32 object-cover rounded-md" />
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
                                {categories.map((cat, index) => (
                                    <option key={index} value={cat.name}>{cat.name}</option>
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
                                {brands.map((brand, index) => (
                                    <option key={index} value={brand.name}>{brand.name}</option>
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
                                rows="4"
                                className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Add Product
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddProduct;
