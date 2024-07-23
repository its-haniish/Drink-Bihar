import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen bg-white text-gray-900">
            <div className="text-center p-6 bg-gray-100 shadow-md rounded-lg">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">404 Not Found</h1>
                <p className="text-sm text-gray-600 mb-4">The page you’re looking for doesn’t exist.</p>
                <button
                    onClick={() => navigate(-1)}
                    className="text-blue-500 hover:text-blue-700 underline focus:outline-none"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default NotFound;
