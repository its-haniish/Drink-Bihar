import React, { useState } from 'react';
import OrderDetailsPopup from '../components/OrderDetailsPopup';
import Navbar from '../components/Navbar'

const mockOrders = [
    {
        id: 1,
        address: '123 Elm Street, Springfield',
        email: 'john.doe@example.com',
        name: 'John Doe',
        quantity: 2,
        price: 29.99,
        products: ['Product A', 'Product B'],
        time: '2024-07-23T12:34:56Z',
        status: 'Pending'
    },
];

const Orders = () => {
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
    };

    const handleClosePopup = () => {
        setSelectedOrder(null);
    };

    return (
        <>
            <Navbar />
            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-2xl font-bold mb-6 text-gray-900">Orders</h1>
                <div className="bg-white shadow-md rounded-lg p-6">
                    {mockOrders.length === 0 ? (
                        <p className="text-gray-700">No orders found.</p>
                    ) : (
                        <ul className="space-y-6">
                            {mockOrders.map((order) => (
                                <li key={order.id} className="border-b pb-6 flex justify-between items-start">
                                    <div className="flex-1">
                                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Order ID: {order.id}</h2>
                                        <p className="text-sm text-gray-600">Status: {order.status}</p>
                                        <p className="text-sm text-gray-600">Order Time: {new Date(order.time).toLocaleString()}</p>
                                        <p className="text-sm text-gray-600">Total Price: ${order.price.toFixed(2)}</p>
                                    </div>
                                    <button
                                        onClick={() => handleViewDetails(order)}
                                        className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        View Details
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {selectedOrder && (
                    <OrderDetailsPopup order={selectedOrder} onClose={handleClosePopup} />
                )}
            </div>
        </>
    );
};

export default Orders;
