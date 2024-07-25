import React, { useEffect, useState, useCallback } from 'react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import ManageCategoryPopup from '../components/ManageCategoryPopup';
import Loading from '../components/Loading';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadingMore from '../components/LoadingMore';

const ManageCategory = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [isMoreLoading, setIsMoreLoading] = useState(false);
    const { isAuthenticated, token } = useSelector(state => state.auth);
    const navigate = useNavigate();

    const handleAddCategory = () => {
        setSelectedCategory(null);
        setIsPopupOpen(true);
    };

    const handleEditCategory = (category) => {
        setSelectedCategory(category);
        setIsPopupOpen(true);
    };

    const fetchAllCategories = useCallback(async () => {
        if (isLoading || isMoreLoading || !hasMore) return;

        if (page === 1) {
            setIsLoading(true);
        } else {
            setIsMoreLoading(true);
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/fetch-all-categories`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ page })
            });

            const result = await response.json();

            if (result?.message === 'Categories fetched successfully') {
                setCategories(prevCategories => [...prevCategories, ...result.data]);
                if (result.data.length < 5) {
                    setHasMore(false);
                } else {
                    setPage(prevPage => prevPage + 1);
                }
            } else {
                alert('Failed to fetch categories');
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            alert('Failed to fetch categories');
        } finally {
            setIsLoading(false);
            setIsMoreLoading(false);
        }
    }, [page, token, isLoading, isMoreLoading, hasMore]);

    const createCategory = async (categoryData) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/create-category`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(categoryData)
            });

            const result = await response.json();

            if (result?.message === 'Category created successfully') {
                setCategories(categories => [result.data, ...categories]);
                setIsLoading(false);
                setIsPopupOpen(false);
            } else {
                alert('Failed to create category');
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error creating category:', error);
            setIsLoading(false);
            alert('Failed to create category');
        }
    };

    const updateCategory = async (categoryId, categoryData) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/update-category`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ categoryId, categoryData })
            });

            const result = await response.json();

            if (result?.message === 'Category updated successfully') {
                const updatedCategories = categories.map(category => {
                    if (category._id === categoryId) {
                        return { ...category, ...result.data };
                    }
                    return category;
                });
                setCategories(updatedCategories);
                setIsLoading(false);
            } else {
                alert(result?.message || 'Failed to update category');
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Error updating category:', error);
            alert('Failed to update category');
        }
    };

    const handleSaveCategory = (categoryData) => {
        if (selectedCategory) {
            updateCategory(selectedCategory._id, categoryData);
        } else {
            createCategory(categoryData);
        }
        setIsPopupOpen(false);
    };

    const handleDeleteCategory = async (id) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/delete-category`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ categoryId: id })
            });

            const result = await response.json();
            if (result?.message === 'Category deleted successfully') {
                console.log('Category deleted successfully');
                setCategories(categories.filter(category => category._id !== id));
                setIsLoading(false);
            } else {
                alert('Failed to delete category');
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Error deleting category:', error);
            alert('Failed to delete category');
        }
    };

    const handleScroll = useCallback(() => {
        const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
        if (bottom && hasMore && !isMoreLoading && !isLoading) {
            fetchAllCategories();
        }
    }, [hasMore, isMoreLoading, isLoading, fetchAllCategories]);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        } else {
            fetchAllCategories();
            window.addEventListener('scroll', handleScroll);
        }
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isAuthenticated, navigate, fetchAllCategories, handleScroll]);

    return (
        <>
            <Navbar />
            {isLoading && <Loading />}
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-xl font-bold">Manage Category</h1>
                    <button
                        onClick={handleAddCategory}
                        className="px-2 py-1 bg-blue-600 flex justify-center items-center text-white rounded-md hover:bg-blue-700 focus:outline-none"
                    >
                        <FaPlus className="inline mr-2" /> Add Category
                    </button>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <ul className="space-y-4">
                        {categories.map((category) => (
                            <li key={category._id} className="flex flex-col md:flex-row items-start md:items-center p-4 border border-gray-300 rounded-md">
                                <div className="w-full md:w-auto">
                                    {category.image ? (
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className="w-full md:w-24 h-24 object-contain rounded-md mb-4"
                                        />
                                    ) : (
                                        <div className="w-full md:w-24 h-24 bg-gray-200 flex justify-center items-center rounded-md mb-4">
                                            <span className="text-gray-500">No Image</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 md:ml-4">
                                    <h2 className="text-lg font-semibold text-gray-900">{category.name}</h2>
                                    <p className="text-sm text-gray-600 mt-2">{category.description}</p>
                                    <div className="flex mt-4 space-x-2">
                                        <button
                                            onClick={() => handleEditCategory(category)}
                                            className="px-3 py-1 text-sm bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none"
                                        >
                                            <FaEdit className="inline mr-1" /> Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCategory(category._id)}
                                            className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
                                        >
                                            <FaTrash className="inline mr-1" /> Delete
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {isMoreLoading && hasMore && <LoadingMore />}
                </div>
            </div>
            {isPopupOpen && (
                <ManageCategoryPopup
                    category={selectedCategory}
                    onSave={handleSaveCategory}
                    onClose={() => setIsPopupOpen(false)}
                />
            )}
        </>
    );
};

export default ManageCategory;
