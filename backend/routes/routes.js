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
        search,
        fetchAllBrandsNames,
        fetchAllCategoriesNames
    } = require('../controllers/fetch.js');

    const {
        sendEmail
    } = require('../controllers/sendEmail.js');

    const {
        fetchAllFeaturedProducts,
        toggleFeaturedProduct
    } = require('../controllers/featured')

    const authenticateToken = require('../utils/authenticateToken.js')

    routes
        // Create routes
        .post('/create-brand', authenticateToken, createBrand)
        .post('/create-category', authenticateToken, createCategory)
        .post('/create-product', authenticateToken, createProduct)

        // Update routes
        .post('/update-brand', authenticateToken, updateBrand)
        .post('/update-category', authenticateToken, updateCategory)
        .post('/update-product', authenticateToken, updateProduct)

        // Delete routes
        .post('/delete-brand', authenticateToken, deleteBrand)
        .post('/delete-category', authenticateToken, deleteCategory)
        .post('/delete-product', authenticateToken, deleteProduct)

        // Authentication routes
        .post('/login-client', loginClient)
        .post('/login-seller', loginSeller)
        .post('/signup-client', signupClient)
        .post('/signup-seller', signupSeller)
        .post('/password-client', updateClientPassword)
        .post('/password-seller', updateSellerPassword)
        .post('/send-email', sendEmail)
        .post('/auto-login', authenticateToken, autoLogin)
        .post('/reset-seller-password', updateSellerPassword)
        .post('/reset-client-password', updateClientPassword)

        // Order routes
        .post('/cancel-order', authenticateToken, cancelOrder)
        .post('/order-details', authenticateToken, fetchOrderDetails)
        .post('/order-place', authenticateToken, placeOrder)
        .post('/update-order-status', authenticateToken, updateOrderStatus)

        // Fetch routes
        .post('/fetch-all-brands', authenticateToken, fetchAllBrands)
        .post('/fetch-all-categories', authenticateToken, fetchAllCategories)
        .post('/fetch-all-products', authenticateToken, fetchAllProducts)
        .post('/fetch-brand', authenticateToken, fetchBrand)
        .post('/fetch-category', authenticateToken, fetchCategory)
        .post('/fetch-product', authenticateToken, fetchProduct)
        .post('/search', authenticateToken, search)
        .post('/fetch-all-brand-names', authenticateToken, fetchAllBrandsNames)
        .post('/fetch-all-category-names', authenticateToken, fetchAllCategoriesNames)

        // featured routes
        .post('/fetch-all-featured-products', authenticateToken, fetchAllFeaturedProducts)
        .post('/toggle-featured-product', authenticateToken, toggleFeaturedProduct)


    module.exports = routes;
