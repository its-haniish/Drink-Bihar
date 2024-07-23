import React, { useState } from 'react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import ManageBrandPopup from '../components/ManageBrandPopup';

const initialBrands = [
    {
        id: 1,
        name: 'Johnnie Walker',
        description: 'Famous for its Scotch whiskies.',
        image: 'https://wallpapercave.com/wp/wp1834487.jpg',
    },
    {
        id: 2,
        name: 'Smirnoff',
        description: 'Well-known vodka brand.',
        image: 'https://wallpapercave.com/wp/wp1834487.jpg',
    },
    // Add more initial brands as needed
];

const ManageBrand = () => {
    const [brands, setBrands] = useState(initialBrands);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleAddBrand = () => {
        setSelectedBrand(null);
        setIsPopupOpen(true);
    };

    const handleEditBrand = (brand) => {
        setSelectedBrand(brand);
        setIsPopupOpen(true);
    };

    const handleSaveBrand = (brandData) => {
        if (selectedBrand) {
            // Update brand
            setBrands(brands.map(brand =>
                brand.id === selectedBrand.id ? { ...brandData, id: selectedBrand.id } : brand
            ));
        } else {
            // Add new brand
            setBrands([...brands, { ...brandData, id: brands.length + 1 }]);
        }
        setIsPopupOpen(false);
    };

    const handleDeleteBrand = (id) => {
        setBrands(brands.filter(brand => brand.id !== id));
    };

    return (
        <>
            <Navbar />
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-xl font-bold">Manage Brands</h1>
                    <button
                        onClick={handleAddBrand}
                        className="px-2 py-1 bg-blue-600 flex justify-center items-center text-white rounded-md hover:bg-blue-700 focus:outline-none"
                    >
                        <FaPlus className="inline mr-2" /> Add Brand
                    </button>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <ul className="space-y-4">
                        {brands.map((brand) => (
                            <li key={brand.id} className="flex flex-col md:flex-row items-start md:items-center p-4 border border-gray-300 rounded-md">
                                <div className="w-full md:w-auto">
                                    <img
                                        src={brand.image}
                                        alt={brand.name}
                                        className="w-full md:w-24 h-24 object-contain rounded-md mb-4"
                                    />
                                </div>
                                <div className="flex-1 md:ml-4">
                                    <h2 className="text-lg font-semibold text-gray-900">{brand.name}</h2>
                                    <p className="text-sm text-gray-600 mt-2">{brand.description}</p>
                                    <div className="flex mt-4 space-x-2">
                                        <button
                                            onClick={() => handleEditBrand(brand)}
                                            className="px-3 py-1 text-sm bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none"
                                        >
                                            <FaEdit className="inline mr-1" /> Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteBrand(brand.id)}
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
                <ManageBrandPopup
                    brand={selectedBrand}
                    onSave={handleSaveBrand}
                    onClose={() => setIsPopupOpen(false)}
                />
            )}
        </>
    );
};

export default ManageBrand;
