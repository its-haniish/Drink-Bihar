import React, { useEffect, useState, useCallback } from 'react';
import { FaArrowLeft, FaStar } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import LoadingMore from '../components/LoadingMore';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isMoreLoading, setIsMoreLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const { isAuthenticated, token } = useSelector(state => state.auth);
    const navigate = useNavigate();

    const fetchFeaturedProducts = useCallback(async () => {
        if (isLoading || isMoreLoading || !hasMore) return;

        if (page === 1) {
            setIsLoading(true);
        } else {
            setIsMoreLoading(true);
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/fetch-all-featured-products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ page }),
            });

            const result = await response.json();

            if (result?.message === 'Featured products fetched successfully') {
                if (result.data.length === 0) {
                    setHasMore(false);
                } else {
                    setProducts(prevProducts => [...prevProducts, ...result.data]);
                    if (result.data.length < 5) {
                        setHasMore(false);
                    } else {
                        setPage(prevPage => prevPage + 1);
                    }
                }
            } else {
                alert('Failed to fetch featured products');
            }
        } catch (error) {
            console.error('Error fetching featured products:', error);
            alert('Failed to fetch featured products');
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
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ productId }),
            });

            const result = await response.json();
            if (response.ok && result?.message === 'Product updated successfully') {
                setProducts(prevProducts =>
                    prevProducts.map(product =>
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
            fetchFeaturedProducts();
        }
    }, [fetchFeaturedProducts]);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        } else {
            fetchFeaturedProducts();
            window.addEventListener('scroll', handleScroll);
        }
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isAuthenticated, navigate, fetchFeaturedProducts, handleScroll]);

    return (
        <>
            <Navbar />
            {isLoading && <Loading />}
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
                            <li key={product._id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border border-gray-300 rounded-md">
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
                                        <p className="text-sm text-gray-600">Price: ₹{product.price.toFixed(2)}/-</p>
                                    </div>
                                    <button
                                        onClick={() => toggleFeatured(product._id)}
                                        className={`mt-4 px-4 py-2 rounded-md text-white ${product.isFeatured ? 'bg-red-600' : 'bg-green-600'} hover:${product.isFeatured ? 'bg-red-700' : 'bg-green-700'} focus:outline-none text-sm md:text-base`}
                                    >
                                        {product.isFeatured ? 'Remove Featured' : 'Add Featured'}
                                        <FaStar className="inline ml-2" />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {isMoreLoading && hasMore && <LoadingMore />}
                </div>
            </div>
        </>
    );
};

export default FeaturedProducts;
