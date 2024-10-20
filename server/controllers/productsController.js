import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";

class ProductsController {
    
    // Get all products with category details and pagination
    async getProducts(req, res) {
        try {
            const pageLimit = parseInt(req.query.limit) || 10;
            const page = parseInt(req.query.page) || 1;

            const totalProducts = await Product.countDocuments(); // Get total number of products
            const totalPages = Math.ceil(totalProducts / pageLimit);

            const products = await Product.find()
                .populate('category', 'name description')
                .skip((page - 1) * pageLimit) // Skip products for pagination
                .limit(pageLimit); // Limit the number of products per page

            if (products.length === 0) {
                return res.status(404).json({ message: 'No products found' });
            }

            res.status(200).json({
                currentPage: page,
                totalPages: totalPages,
                totalProducts: totalProducts,
                products: products,
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

    // Get a single product by ID
    async getProductById(req, res) {
        try {
            const product = await Product.findById(req.params.id).populate('category', 'name description');
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            if (error.kind === 'ObjectId') {
                return res.status(400).json({ message: 'Invalid product ID' });
            }
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

    // Get all categories
    async getCategories(req, res) {
        try {
            const categories = await Category.find();
            if (categories.length === 0) {
                return res.status(404).json({ message: 'No categories found' });
            }
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

    // Get products by category with pagination
    async getProductsByCategory(req, res) {
        try {
            const category = await Category.findById(req.params.categoryId);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }

            const pageLimit = parseInt(req.query.limit) || 20;
            const page = parseInt(req.query.page) || 1;

            const totalProducts = await Product.countDocuments({ category: category._id });
            const totalPages = Math.ceil(totalProducts / pageLimit);

            const products = await Product.find({ category: category._id })
                .populate('category', 'name description')
                .select('name description price stock images category')
                .skip((page - 1) * pageLimit)
                .limit(pageLimit);

            if (products.length === 0) {
                return res.status(404).json({ message: 'No products found for this category' });
            }

            res.status(200).json({
                currentPage: page,
                totalPages: totalPages,
                totalPages: totalPages,
                totalProducts: totalProducts,
                products: products,
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

    // Search products by name or description
    async searchProducts(req, res) {
        try {
            const searchQuery = req.query.q;
            const page = parseInt(req.query.page) || 1;  // Page number, default to 1
            const limit = parseInt(req.query.limit) || 20;  // Results per page, default to 20
            const skip = (page - 1) * limit;  // Number of results to skip for pagination
    
            if (!searchQuery) {
                return res.status(400).json({ message: 'Search query is required' });
            }
    
            // Count the total number of matching products
            const totalProducts = await Product.countDocuments({
                $or: [
                    { name: { $regex: searchQuery, $options: 'i' } },
                    { description: { $regex: searchQuery, $options: 'i' } }
                ]
            });
    
            // Fetch the matching products with pagination
            const products = await Product.find({
                $or: [
                    { name: { $regex: searchQuery, $options: 'i' } },
                    { description: { $regex: searchQuery, $options: 'i' } }
                ]
            })
            .populate('category', 'name description')
            .skip(skip)  // Skip the appropriate number of results
            .limit(limit);  // Limit the number of results
    
            // If no products were found
            if (products.length === 0) {
                return res.status(404).json({ message: 'No products match your search' });
            }
    
            // Calculate the total number of pages
            const totalPages = Math.ceil(totalProducts / limit);
    
            // Return the paginated results
            res.status(200).json({
                currentPage: page,
                totalPages: totalPages,
                totalProducts: totalProducts,
                products: products,
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
    

    // Get reviews of a specific product
    async getProductReviews(req, res) {
        try {
            const product = await Product.findById(req.params.id).select('reviews');
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            if (!product.reviews || product.reviews.length === 0) {
                return res.status(404).json({ message: 'No reviews for this product' });
            }
            res.status(200).json(product.reviews);
        } catch (error) {
            if (error.kind === 'ObjectId') {
                return res.status(400).json({ message: 'Invalid product ID' });
            }
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
}

export default new ProductsController();
