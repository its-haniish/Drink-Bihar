import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import { useSelector } from 'react-redux';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, token } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        category: '',
        brand: '',
        price: '',
        description: '',
    });
    const [imagePreview, setImagePreview] = useState('');
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
            return;
        }
        fetchProductDetails();
        fetchBrandNames();
        fetchCategoryNames();
    }, [id, isAuthenticated, navigate, token]);

    const fetchProductDetails = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/fetch-product`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ id })
            });

            const result = await response.json();

            if (result?.message === 'Product fetched successfully') {
                setFormData(result.data);
                setImagePreview(result.data.image);
                setIsLoading(false);
            } else {
                console.error('Failed to fetch product details');
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error fetching product details:', error);
            setIsLoading(false);
        }
    };

    const fetchBrandNames = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/fetch-all-brand-names`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const result = await response.json();

            if (result.message === 'Brand names fetched successfully') {
                setBrands(result.data);
            } else {
                console.error('Failed to fetch brands');
            }
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    };

    const fetchCategoryNames = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/fetch-all-category-names`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const result = await response.json();

            if (result.message === 'Category names fetched successfully') {
                setCategories(result.data);
            } else {
                console.error('Failed to fetch categories');
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/update-product`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ productId: id, productData: formData }),
            });

            const result = await response.json();

            if (result.message === 'Product updated successfully.') {
                navigate('/all-products');
            } else {
                console.error('Failed to update product');
                alert('Failed to update product');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            {isLoading && <Loading />}
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="flex items-center mb-4">
                    <button
                        onClick={() => navigate('/all-products')}
                        className="text-black hover:text-gray-700 focus:outline-none"
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
                                {categories.map((cat) => (
                                    <option key={cat.name} value={cat.name}>{cat.name}</option>
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
                                {brands.map((brand) => (
                                    <option key={brand.name} value={brand.name}>{brand.name}</option>
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
