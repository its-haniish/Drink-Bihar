import React, { useEffect, useState, useCallback } from 'react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import ManageBrandPopup from '../components/ManageBrandPopup';
import Loading from '../components/Loading';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadingMore from '../components/LoadingMore';

const ManageBrand = () => {
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [isMoreLoading, setIsMoreLoading] = useState(false);
    const { isAuthenticated, token } = useSelector(state => state.auth);
    const navigate = useNavigate();

    const handleAddBrand = () => {
        setSelectedBrand(null);
        setIsPopupOpen(true);
    };

    const handleEditBrand = (brand) => {
        setSelectedBrand(brand);
        setIsPopupOpen(true);
    };

    const fetchAllBrands = useCallback(async () => {
        if (isLoading || isMoreLoading || !hasMore) return;

        if (page === 1) {
            setIsLoading(true);
        } else {
            setIsMoreLoading(true);
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/fetch-all-brands`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ page })
            });

            const result = await response.json();

            if (result?.message === 'Brands fetched successfully') {
                if (result.data.length === 0) {
                    setHasMore(false);
                } else {
                    setBrands(prevBrands => [...prevBrands, ...result.data]);
                    if (result.data.length < 5) {
                        setHasMore(false);
                    } else {
                        setPage(prevPage => prevPage + 1);
                    }
                }
            } else {
                alert('Failed to fetch brands');
            }
        } catch (error) {
            console.error('Error fetching brands:', error);
            alert('Failed to fetch brands');
        } finally {
            setIsLoading(false);
            setIsMoreLoading(false);
        }
    }, [page, token, isLoading, isMoreLoading, hasMore,]);

    const createBrand = async (brandData) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/create-brand`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(brandData)
            });

            const result = await response.json();

            if (result?.message === 'Brand created successfully') {
                setBrands(brands => [result.data, ...brands]);
                setIsLoading(false);
            } else {
                alert('Failed to create brand');
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error creating brand:', error);
            setIsLoading(false);
            alert('Failed to create brand');
        }
    };

    const updateBrand = async (brandId, brandData) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/update-brand`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ brandId, brandData })
            });

            const result = await response.json();

            if (result?.message === 'Brand updated successfully.') {
                const updatedBrands = brands.map(brand => {
                    if (brand._id === brandId) {
                        return { ...brand, ...result.data };
                    }
                    return brand;
                });
                setBrands(updatedBrands);
                setIsLoading(false);
            } else {
                alert(result?.message || 'Failed to update brand');
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Error updating brand:', error);
            alert('Failed to update brand');
        }
    };

    const handleSaveBrand = (brandData) => {
        if (selectedBrand) {
            updateBrand(selectedBrand._id, brandData);
        } else {
            createBrand(brandData);
        }
        setIsPopupOpen(false);

    };

    const handleDeleteBrand = async (id) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/delete-brand`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ brandId: id })
            });

            const result = await response.json();

            if (result?.message === 'Brand deleted successfully') {
                setBrands(brands.filter(brand => brand._id !== id));
                setIsLoading(false);
            } else {
                alert('Failed to delete brand');
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Error deleting brand:', error);
            alert('Failed to delete brand');
        }
    };

    const handleScroll = useCallback(() => {
        const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
        if (bottom && hasMore && !isMoreLoading && !isLoading) {
            fetchAllBrands();
        }
    }, [hasMore, isMoreLoading, isLoading, fetchAllBrands]);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        } else {
            fetchAllBrands();
            window.addEventListener('scroll', handleScroll);
        }
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isAuthenticated, navigate, fetchAllBrands, handleScroll]);

    return (
        <>
            <Navbar />
            {isLoading && <Loading />}
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
                            <li key={brand._id} className="flex flex-col md:flex-row items-start md:items-center p-4 border border-gray-300 rounded-md">
                                <div className="w-full md:w-auto">
                                    {brand.image ? (
                                        <img
                                            src={brand.image}
                                            alt={brand.name}
                                            className="w-full md:w-24 h-24 object-contain rounded-md mb-4"
                                        />
                                    ) : (
                                        <div className="w-full md:w-24 h-24 bg-gray-200 flex justify-center items-center rounded-md mb-4">
                                            <span className="text-gray-500">No Image</span>
                                        </div>
                                    )}
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
                                            onClick={() => handleDeleteBrand(brand._id)}
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
