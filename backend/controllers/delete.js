const Brands = require('../models/brands');
const Products = require('../models/products');
const Category = require('../models/Category');

const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.body;

        // Delete the product
        const result = await Products.deleteOne({ _id: productId });

        if (result.deletedCount === 1) {
            res.status(200).json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete product' });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.body;

        // Delete the category
        const result = await Category.deleteOne({ _id: categoryId });

        if (result.deletedCount === 1) {
            res.status(200).json({ message: 'Category deleted successfully' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete category' });
    }
};

const deleteBrand = async (req, res) => {
    try {
        const { brandId } = req.body;

        // Delete the brand
        const result = await Brands.deleteOne({ _id: brandId });

        if (result.deletedCount === 1) {
            res.status(200).json({ message: 'Brand deleted successfully' });
        } else {
            res.status(404).json({ message: 'Brand not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete brand' });
    }
};

module.exports = {
    deleteProduct,
    deleteCategory,
    deleteBrand
};
