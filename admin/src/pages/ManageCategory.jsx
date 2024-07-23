import React, { useState } from 'react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import ManageCategoryPopup from '../components/ManageCategoryPopup';

const initialCategories = [
    {
        id: 1,
        name: 'Whiskey',
        description: 'Strong distilled alcoholic beverage.',
        image: 'https://wallpapercave.com/wp/wp1834487.jpg',
    },
    {
        id: 2,
        name: 'Vodka',
        description: 'Clear distilled spirit.',
        image: 'https://wallpapercave.com/wp/wp1834487.jpg',
    },
    // Add more initial categories as needed
];

const ManageCategory = () => {
    const [categories, setCategories] = useState(initialCategories);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleAddCategory = () => {
        setSelectedCategory(null);
        setIsPopupOpen(true);
    };

    const handleEditCategory = (category) => {
        setSelectedCategory(category);
        setIsPopupOpen(true);
    };

    const handleSaveCategory = (categoryData) => {
        if (selectedCategory) {
            // Update category
            setCategories(categories.map(category =>
                category.id === selectedCategory.id ? { ...categoryData, id: selectedCategory.id } : category
            ));
        } else {
            // Add new category
            setCategories([...categories, { ...categoryData, id: categories.length + 1 }]);
        }
        setIsPopupOpen(false);
    };

    const handleDeleteCategory = (id) => {
        setCategories(categories.filter(category => category.id !== id));
    };

    return (
        <>
            <Navbar />
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-xl font-bold">Manage Category</h1>
                    <button
                        onClick={handleAddCategory}
                        className="px-2 py-1 bg-blue-600 flex justify-center items-center text-white rounded-md hover:bg-blue-700 focus:outline-none"
                    >
                        <FaPlus className="inline mr-2" />Add Category
                    </button>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <ul className="space-y-4">
                        {categories.map((category) => (
                            <li key={category.id} className="flex flex-col md:flex-row items-start md:items-center p-4 border border-gray-300 rounded-md">
                                <div className="w-full md:w-auto">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full md:w-24 h-24 object-contain rounded-md mb-4"
                                    />
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
                                            onClick={() => handleDeleteCategory(category.id)}
                                            className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
                                        >
                                            <FaTrash className="inline mr-1" /> Delete
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
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
