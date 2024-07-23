const Brands = require('../models/brands');
const Products = require('../models/products');
const Category = require('../models/Category');

const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.body;

        // Update product availability
        await Products.findByIdAndUpdate(productId, { isAvailable: false });

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to deleted product' });
    }
}

const deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.body;

        // Update category availability
        await Category.findByIdAndUpdate(categoryId, { isAvailable: false });

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete category' });
    }
}

const deleteBrand = async (req, res) => {
    try {
        const { brandId } = req.body;

        // Update brand availability
        await Brands.findByIdAndUpdate(brandId, { isAvailable: false });

        res.status(200).json({ message: 'Brand deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete brand' });
    }
}

module.exports = {
    deleteProduct,
    deleteCategory,
    deleteBrand
}