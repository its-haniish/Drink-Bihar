const express = require('express');
const routes = express.Router();

const {
    createBrand,
    createCategory,
    createProduct
} = require("../controllers/create.js");

const {
    updateBrand,
    updateCategory,
    updateProduct
} = require("../controllers/update.js");

const {
    deleteBrand,
    deleteCategory,
    deleteProduct
} = require("../controllers/delete.js");

const {
    loginClient,
    loginSeller,
    signupClient,
    signupSeller,
    updateClientPassword,
    updateSellerPassword,
    autoLogin
} = require('../controllers/auth.js');

const {
    cancelOrder,
    fetchOrderDetails,
    placeOrder,
    updateOrderStatus
} = require('../controllers/order');

const {
    fetchAllBrands,
    fetchAllCategories,
    fetchAllProducts,
    fetchBrand,
    fetchCategory,
    fetchProduct,
    search
} = require('../controllers/fetch.js');

const {
    sendEmail
} = require('../controllers/sendEmail.js');

const authenticateToken = require('../utils/authenticateToken.js')

routes
    // Create routes
    .post('/create-brand', createBrand)
    .post('/create-category', createCategory)
    .post('/create-product', createProduct)

    // Update routes
    .post('/update-brand', updateBrand)
    .post('/update-category', updateCategory)
    .post('/update-product', updateProduct)

    // Delete routes
    .post('/delete-brand', deleteBrand)
    .post('/delete-category', deleteCategory)
    .post('/delete-product', deleteProduct)

    // Authentication routes
    .post('/login-client', loginClient)
    .post('/login-seller', loginSeller)
    .post('/signup-client', signupClient)
    .post('/signup-seller', signupSeller)
    .post('/password-client', updateClientPassword)
    .post('/password-seller', updateSellerPassword)
    .post('/send-email', sendEmail)
    .post('/auto-login', authenticateToken, autoLogin)

    // Order routes
    .post('/cancel-order', cancelOrder)
    .post('/order-details', fetchOrderDetails)
    .post('/order-place', placeOrder)
    .post('/update-order-status', updateOrderStatus)

    // Fetch routes
    .post('/fetch-all-brands', fetchAllBrands)
    .post('/fetch-all-categories', fetchAllCategories)
    .post('/fetch-all-products', fetchAllProducts)
    .post('/fetch-brand', fetchBrand)
    .post('/fetch-category', fetchCategory)
    .post('/fetch-product', fetchProduct)
    .post('/search', search);


module.exports = routes;
