import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";

class ProductsController {
    
    // Get all products with category details
    async getProducts(req, res) {
        try {
            const products = await Product.find().populate('category', 'name description');
            if (products.length === 0) {
                return res.status(404).json({ message: 'No products found' });
            }
            res.status(200).json(products);
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

    // Get products by category
    async getProductsByCategory(req, res) {
        try {
            // Use req.params.categoryId instead of category name
            const category = await Category.findById(req.params.categoryId);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            
            // Fetch products for this category
            const products = await Product.find({ category: category._id }).populate('category', 'name description');
            if (products.length === 0) {
                return res.status(404).json({ message: 'No products found for this category' });
            }
    
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
    
    

    // Search products by name or description
    async searchProducts(req, res) {
        try {
            const searchQuery = req.query.q;
            if (!searchQuery) {
                return res.status(400).json({ message: 'Search query is required' });
            }
            const products = await Product.find({
                $or: [
                    { name: { $regex: searchQuery, $options: 'i' } },
                    { description: { $regex: searchQuery, $options: 'i' } },
                ]
            }).populate('category', 'name description');
            
            if (products.length === 0) {
                return res.status(404).json({ message: 'No products match your search' });
            }

            res.status(200).json(products);
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