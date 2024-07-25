const Brands = require('../models/brands');
const Products = require('../models/products');
const Category = require('../models/Category')

const fetchAllProducts = async (req, res) => {
    try {
        const { category, minPrice, maxPrice, brands, page, sort } = req.body;
        const limit = 5;
        const skip = (page - 1) * limit;

        let query = {};

        if (category && category.length > 0) {
            query.category = { $in: category };
        }

        if (minPrice !== undefined || maxPrice !== undefined) {
            query.price = {};
            if (minPrice !== undefined) {
                query.price.$gte = Number(minPrice);
            }
            if (maxPrice !== undefined) {
                query.price.$lte = Number(maxPrice);
            }
        }

        if (brands && brands.length > 0) {
            query.brand = { $in: brands };
        }

        let sortOption = {};
        if (sort === 'price-asc') {
            sortOption.price = 1; // Ascending order
        } else if (sort === 'price-desc') {
            sortOption.price = -1; // Descending order
        }

        const products = await Products.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(limit);

        res.status(200).json({ message: 'Products fetched successfully', data: products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const fetchAllBrands = async (req, res) => {
    try {
        const { page } = req.body;
        const limit = 5;
        const skip = (page - 1) * limit;

        const brands = await Brands.find({})
            .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
            .skip(skip)
            .limit(limit);
        res.status(200).json({ message: 'Brands fetched successfully', data: brands });
    } catch (error) {
        console.error('Error fetching brands:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const fetchAllCategories = async (req, res) => {
    try {
        const { page } = req.body;
        const limit = 5;
        const skip = (page - 1) * limit;

        const categories = await Category.find({})
            .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
            .skip(skip)
            .limit(limit);

        res.status(200).json({ message: 'Categories fetched successfully', data: categories });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const fetchProduct = async (req, res) => {
    try {
        const { id } = req.body;

        const product = await Products.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product fetched successfully', data: product });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const fetchBrand = async (req, res) => {
    try {
        const { id } = req.body;

        const brand = await Brands.findById(id);

        if (!brand) {
            return res.status(404).json({ message: 'Brand not found' });
        }

        res.status(200).json({ brand });
    } catch (error) {
        console.error('Error fetching brand:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const fetchCategory = async (req, res) => {
    try {
        const { id } = req.body;

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ category });
    } catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const search = async (req, res) => {
    console.log('Searching')
    try {
        const { keyword, page } = req.body;
        const limit = 20;
        const skip = (page - 1) * limit;

        if (!keyword || !page) {
            console.error('Keyword and page are required');
            return res.status(400).json({ message: 'Keyword and page are required' });
        }

        // Log keyword and page
        console.log(`Searching for keyword: ${keyword}, page: ${page}`);

        // Create a case-insensitive regex for the keyword
        const keywordRegex = new RegExp(keyword, 'i');

        // Query to search for products by category, brand, or product name
        const query = {
            $or: [
                { category: { $regex: keywordRegex } },
                { brand: { $regex: keywordRegex } },
                { name: { $regex: keywordRegex } }
            ]
        };

        // Fetch products matching the query
        const products = await Products.find(query)
            .skip(skip)
            .limit(limit)
            .lean(); // .lean() is used to get plain JavaScript objects instead of Mongoose documents

        // Log fetched products
        console.log('Products fetched:', products);

        res.status(200).json({ message: 'Products searched successfully', products });
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const fetchAllBrandsNames = async (req, res) => {
    try {
        const brands = await Brands.find({}).select('name -_id');

        res.status(200).json({ message: 'Brand names fetched successfully', data: brands });
    } catch (error) {
        console.error('Error fetching brand names:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const fetchAllCategoriesNames = async (req, res) => {
    try {
        const categories = await Category.find({}).select('name -_id'); // Select only the name field and exclude the _id field

        res.status(200).json({ message: 'Category names fetched successfully', data: categories });
    } catch (error) {
        console.error('Error fetching category names:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    fetchAllProducts,
    fetchAllBrands,
    fetchAllCategories,
    fetchProduct,
    fetchBrand,
    fetchCategory,
    search,
    fetchAllBrandsNames,
    fetchAllCategoriesNames
}