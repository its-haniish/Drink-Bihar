const Brands = require('../models/Brands');
const Category = require('../models/Category');
const Products = require('../models/Products');


const updateBrand = async (req, res) => {
    try {
        const { brandId, brand } = req.body;

        const result = await Brands.updateOne({ _id: brandId }, { ...brand });

        if (result && result.modifiedCount === 1) {
            return res.status(200).json({ message: "Brand updated successfully." });
        } else {
            return res.status(500).json({ message: "Error updating brand." });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update brand' });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { categoryId, category } = req.body;

        const result = await Category.updateOne({ _id: categoryId }, { ...category });

        if (result && result.modifiedCount === 1) {
            return res.status(200).json({ message: "Category updated successfully." });
        } else {
            return res.status(500).json({ message: "Error updating category." });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update category' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { productId, product } = req.body;

        const result = await Products.updateOne({ _id: productId }, { ...product });

        if (result && result.modifiedCount === 1) {
            return res.status(200).json({ message: "Product updated successfully." });
        } else {
            return res.status(500).json({ message: "Error updating product." });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
    }
};

module.exports = {
    updateBrand,
    updateCategory,
    updateProduct,
};