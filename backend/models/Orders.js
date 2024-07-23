const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    clientId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: ''
    },
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    deliveredAt: {
        type: Date,
        default: null
    },
    totalPrice: {
        type: Number,
        required: true
    },
    sellerId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.models.Order || mongoose.model('Order', ordersSchema);
