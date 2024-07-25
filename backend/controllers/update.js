const Brands = require('../models/brands');
const Products = require('../models/products');
const Category = require('../models/Category');

const updateBrand = async (req, res) => {
    try {
        const { brandId, brandData } = req.body;

        const result = await Brands.updateOne({ _id: brandId }, { ...brandData });

        if (result && result.modifiedCount === 1) {
            return res.status(200).json({ message: "Brand updated successfully.", data: { ...brandData, _id: brandId } });
        } else {
            return res.status(500).json({ message: "Error updating brand." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to update brand' });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { categoryId, categoryData } = req.body;

        const result = await Category.updateOne({ _id: categoryId }, { ...categoryData });

        if (result && result.modifiedCount === 1) {
            return res.status(200).json({ message: "Category updated successfully", data: { ...categoryData, _id: categoryId } });
        } else {
            return res.status(500).json({ message: "Error updating category." });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update category' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { productId, productData } = req.body;

        const result = await Products.updateOne({ _id: productId }, { ...productData });

        if (result && result.modifiedCount === 1) {
            return res.status(200).json({ message: "Product updated successfully." });
        } else {
            return res.status(500).json({ message: "Error updating product." });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update product' });
    }
};

module.exports = {
    updateBrand,
    updateCategory,
    updateProduct,
};
