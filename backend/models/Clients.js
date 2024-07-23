const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const clientsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: ''
    },
    orders: {
        type: [String],
        default: []
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

clientsSchema.pre("save", async function (next) {
    try {
        const saltRound = await bcrypt.genSalt();
        const hash_password = await bcrypt.hash(this.password, saltRound);
        this.password = hash_password;
        return next();
    } catch (error) {
        return next(error);
    }
});

clientsSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({ id: this._id.toString() }, process.env.JWT_KEY, { expiresIn: '30d' });
    } catch (error) {
        // Handle error appropriately
        console.error('Error generating token:', error);
        return null; // Or throw error as per your requirement
    }
};

clientsSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
}

module.exports = mongoose.models.Client || mongoose.model('Client', clientsSchema);
