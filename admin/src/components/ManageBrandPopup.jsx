import React, { useState, useEffect } from 'react';
import { FaImage } from 'react-icons/fa';

const ManageBrandPopup = ({ brand, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: '',
    });
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        if (brand) {
            setFormData({
                name: brand.name || '',
                description: brand.description || '',
                image: brand.image || '',
            });
            setImagePreview(brand.image || '');
        } else {
            setFormData({ name: '', description: '', image: '' });
            setImagePreview('');
        }
    }, [brand]);

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
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs sm:max-w-md md:max-w-lg w-full">
                <h2 className="text-xl font-semibold mb-4 text-center">
                    {brand ? 'Update Brand' : 'Add Brand'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Brand Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            rows="4"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700 flex items-center">
                            <FaImage className="mr-2" /> Brand Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mt-1"
                        />
                        {imagePreview && (
                            <div className="mt-4 flex justify-center">
                                <img src={imagePreview} alt="Brand Preview" className="w-full max-w-xs h-auto object-cover rounded-md" />
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                        >
                            {brand ? 'Update Brand' : 'Add Brand'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ManageBrandPopup;
