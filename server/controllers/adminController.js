import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";

class AdminController {
    async addProduct(req, res) {
        try {
            const { name, description, price, category, stock } = req.body;

            // Check if the category exists
            const existingCategory = await Category.findById(category);
            if (!existingCategory) {
                return res.status(400).json({ error: 'Invalid category ID' });
            }

            // Handle uploaded images
            const imagePaths = req.files ? req.files.map(file => file.path) : [];

            // Create new product
            const newProduct = new Product({
                name,
                description,
                price,
                category,
                stock,
                images: imagePaths // Save the image paths
            });

            await newProduct.save();
            res.status(201).json({ message: 'Product added successfully', product: newProduct });
        } catch (error) {
            console.error('This is the error', error);
            res.status(500).json({ error: 'Error adding product', details: error });
        }
    }

    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const updates = req.body;

            // Handle image updates if new images are uploaded
            if (req.files) {
                const imagePaths = req.files.map(file => file.path);
                updates.images = imagePaths;  // Update images in the product
            }

            const updateProduct = await Product.findByIdAndUpdate(id, updates, { new: true });
            if (!updateProduct) {
                return res.status(400).json({ error: 'Product not found' });
            }

            res.status(200).json({ message: 'Product updated successfully', product: updateProduct });
        } catch (error) {
            res.status(500).json({ error: 'Error updating product', details: error });
        }
    }

    async deleteProduct(req, res) {
        try {
            const { productId } = req.params;
            const deletedProduct = await Product.findByIdAndDelete(productId);
            if (!deletedProduct) {
                return res.status(400).json({ error: 'Product not found' });
            }
            res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
        } catch (error) {
            res.status(500).json({ error: 'Error deleting product', details: error });
        }
    }

    async getAllOrders(req, res) {
        try {
            const orders = await Order.find();
            res.status(200).json({
                message: 'Orders retrieved successfully',
                orders,
            });
        } catch (error) {
            res.status(500).json({ error: 'Error retrieving orders', details: error });
        }
    }
}

export default new AdminController();
