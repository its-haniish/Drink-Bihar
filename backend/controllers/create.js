const Brands = require('../models/brands');
const Products = require('../models/products');
const Category = require('../models/Category')

const createProduct = async (req, res) => {
    try {
        const { name, price, brand, image, description, category } = req.body;

        const product = await Products.create({
            name,
            price,
            brand,
            image,
            description,
            category
        });

        if (!product) {
            return res.status(400).json({ message: 'Product creation failed' });
        }

        res.status(200).json({ message: 'Product created successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const createBrand = async (req, res) => {
    try {
        const { name, description, image } = req.body;

        const brand = await Brands.create({
            name,
            description,
            image
        });

        if (!brand) {
            return res.status(400).json({ message: 'Brand creation failed' });
        }

        res.status(200).json({ message: 'Brand created successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const createCategory = async (req, res) => {
    try {
        const { name, description, image } = req.body;

        const category = await Category.create({
            name,
            description,
            image
        });

        if (!category) {
            return res.status(400).json({ message: 'Category creation failed' });
        }

        res.status(200).json({ message: 'Category created successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    createProduct,
    createBrand,
    createCategory
};