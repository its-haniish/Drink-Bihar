const mongoose = require('mongoose');

const brandsSchema = new mongoose.Schema({
    image: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.models.Brand || mongoose.model('Brand', brandsSchema);
