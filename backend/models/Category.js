const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
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

module.exports = mongoose.models.Category || mongoose.model('Category', categorySchema);
