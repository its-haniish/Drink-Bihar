const Orders = require('../models/Orders');

const placeOrder = async (req, res) => {
    try {

        const { clientId, productId, sellerId, address, quantity, status, totalPrice } = req.body;

        const product = await Orders.create({ clientId, productId, sellerId, address, quantity, status, totalPrice });

        if (!product) {
            return res.status(400).json({ message: 'Error placing successfully' });
        }

        res.status(200).json({ message: 'Order placed successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        const order = await Orders.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const result = await Orders.updateOne({ _id: orderId }, { status });

        if (result && result.modifiedCount === 1) {
            return res.status(200).json({ message: "Order status updated successfully." });
        } else {
            return res.status(500).json({ message: "Error updating order status." });
        }
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const cancelOrder = async (req, res) => {
    try {
        const { orderId, isSeller } = req.body;

        const order = await Orders.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        if (order.status === "shipped" && !isSeller) {
            return res.status(400).json({ message: 'Order already shipped cannot be canceled.' });
        }

        const result = await Orders.deleteOne({ _id: orderId });

        if (result && result.deletedCount === 1) {
            return res.status(200).json({ message: "Order canceled successfully." });
        } else {
            return res.status(500).json({ message: "Error canceling order." });
        }
    } catch (error) {
        console.error('Error canceling order:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const fetchOrderDetails = async (req, res) => {
    try {
        const { orderId } = req.body;
        const order = await Orders.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }
        res.status(200).json({ order });
    } catch (error) {
        console.error('Error fetching order details:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

}

module.exports = {
    placeOrder,
    updateOrderStatus,
    cancelOrder,
    fetchOrderDetails
}