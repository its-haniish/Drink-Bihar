import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaEye } from 'react-icons/fa'; // Importing icons from react-icons
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import LoadingMore from '../components/LoadingMore';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isMoreLoading, setIsMoreLoading] = useState(false);
    const { isAuthenticated, token } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const fetchAllProducts = useCallback(async () => {
        if (isLoading || isMoreLoading || !hasMore) return;

        if (page === 1) {
            setIsLoading(true);
        } else {
            setIsMoreLoading(true);
        }

        try {
            console.log('Fetching all products, page:', page);
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/fetch-all-products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ page }),
            });
            const result = await response.json();
            console.log('All products fetched:', result);

            if (result?.message === 'Products fetched successfully') {
                if (result.data.length === 0) {
                    setHasMore(false);
                } else {
                    setProducts((prevProducts) => [...prevProducts, ...result.data]);
                    if (result.data.length < 5) {
                        setHasMore(false);
                    } else {
                        setPage((prevPage) => prevPage + 1);
                    }
                }
            } else {
                console.log(result?.message);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            alert('Failed to fetch products');
        } finally {
            setIsLoading(false);
            setIsMoreLoading(false);
        }
    }, [page, token, isLoading, isMoreLoading, hasMore]);

    const toggleFeatured = async (productId) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/toggle-featured-product`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ productId }),
            });

            const result = await response.json();
            console.log('Toggle featured result:', result);
            if (response.ok && result?.message === 'Product updated successfully') {
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product._id === productId ? { ...product, isFeatured: !product.isFeatured } : product
                    )
                );
            } else {
                alert(result?.message);
            }
        } catch (error) {
            console.error('Error toggling featured product:', error);
            alert('Failed to toggle featured product');
        } finally {
            setIsLoading(false);
        }
    };

    const handleScroll = useCallback(() => {
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
            fetchAllProducts();
        }
    }, [fetchAllProducts]);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        } else {
            fetchAllProducts();
            window.addEventListener('scroll', handleScroll);
        }
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isAuthenticated, navigate, fetchAllProducts, handleScroll]);

    return (
        <>
            <Navbar />
            {(isLoading && page === 1) && <Loading />}
            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-2xl font-bold mb-4">All Products</h1>
                {isLoading && page > 1 && <Loading />}
                <div className="bg-white shadow-md rounded-lg p-6">
                    {products.length === 0 && !isLoading ? (
                        <p>No products found.</p>
                    ) : (
                        <ul className="space-y-4">
                            {products.map((product) => (
                                <li key={product._id} className="border-b pb-4 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full sm:w-32 h-32 object-contain rounded-md mb-4 sm:mb-0"
                                    />
                                    <div className="flex-1">
                                        <p className="font-bold text-lg">{product.name}</p>
                                        <p className="text-sm text-gray-600">Category: {product.category}</p>
                                        <p className="text-sm text-gray-600">Brand: {product.brand}</p>
                                        <p className="text-sm text-gray-600">Price: ₹{product.price.toFixed(2)}/-</p>
                                        <p className="text-sm text-gray-700 mt-2">{product.description}</p>
                                    </div>
                                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                                        <Link
                                            to={`/edit-product/${product._id}`}
                                            className="flex items-center px-2 py-1 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 text-sm"
                                        >
                                            <FaEye className="mr-2" /> View
                                        </Link>
                                        <button
                                            className={`flex items-center px-2 py-1 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm ${product.isFeatured
                                                ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                                                : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                                                }`}
                                            onClick={() => toggleFeatured(product._id)}
                                        >
                                            <FaStar className="mr-2" />
                                            {product.isFeatured ? 'Remove Featured' : 'Add Featured'}
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {isMoreLoading && hasMore && <LoadingMore />}
            </div>
        </>
    );
};

export default AllProducts;
