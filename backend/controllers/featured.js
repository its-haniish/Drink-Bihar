const Products = require('../models/products');

const fetchAllFeaturedProducts = async (req, res) => {
    try {
        const { page } = req.body;
        const limit = 5;
        const skip = (page - 1) * limit;

        const featuredProducts = await Products.find({ isFeatured: true })
            .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
            .skip(skip)
            .limit(limit);
        res.status(200).json({ message: 'Featured products fetched successfully', data: featuredProducts });
    } catch (error) {
        console.error('Error fetching featured products:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const toggleFeaturedProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await Products.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const state = !product.isFeatured;

        const response = await Products.updateOne({ _id: productId }, { isFeatured: state });

        if (response.modifiedCount === 1) {
            return res.status(200).json({ message: 'Product updated successfully' }); // Changed to 200
        } else {
            return res.status(500).json({ message: 'Error updating product' }); // Changed to 500
        }
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports = {
    fetchAllFeaturedProducts,
    toggleFeaturedProduct
}