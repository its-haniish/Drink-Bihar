const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    isAvaliable: {
        type: Boolean,
        default: true
    },
    category: {
        type: String,
        required: true
    }
});

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
