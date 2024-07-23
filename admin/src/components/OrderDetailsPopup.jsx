import React from 'react';

const OrderDetailsPopup = ({ order, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg"
                >
                    &times;
                </button>
                <h2 className="text-xl font-bold mb-4">Order Details</h2>
                <div className="space-y-4">
                    <p><strong>Address:</strong> {order.address}</p>
                    <p><strong>Email:</strong> {order.email}</p>
                    <p><strong>Name:</strong> {order.name}</p>
                    <p><strong>Quantity:</strong> {order.quantity}</p>
                    <p><strong>Price:</strong> ${order.price.toFixed(2)}</p>
                    <p><strong>Products:</strong> {order.products.join(', ')}</p>
                    <p><strong>Time:</strong> {new Date(order.time).toLocaleString()}</p>
                    <div>
                        <strong>Status:</strong> {order.status}
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default OrderDetailsPopup;
