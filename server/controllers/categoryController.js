import Category from '../models/categoryModel.js';

class CategoryController {
    // Add a new category
    async addCategory(req, res) {
        try {
            const { name, description } = req.body;

            // Check if category already exists
            const existingCategory = await Category.findOne({ name });
            if (existingCategory) {
                return res.status(400).json({ message: 'Category already exists' });
            }

            // Create new category
            const newCategory = new Category({ name, description });
            await newCategory.save();

            res.status(201).json({ message: 'Category created successfully', category: newCategory });
        } catch (error) {
            res.status(500).json({ error: 'Error adding category', details: error });
        }
    }

    // Get all categories
    async getCategories(req, res) {
        try {
            const categories = await Category.find();
            res.status(200).json({ categories });
        } catch (error) {
            res.status(500).json({ error: 'Error fetching categories', details: error });
        }
    }

    // Get category by ID
    async getCategoryById(req, res) {
        try {
            const category = await Category.findById(req.params.id);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.status(200).json({ category });
        } catch (error) {
            res.status(500).json({ error: 'Error fetching category', details: error });
        }
    }

    // Update category
    async updateCategory(req, res) {
        try {
            const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedCategory) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
        } catch (error) {
            res.status(500).json({ error: 'Error updating category', details: error });
        }
    }

    // Delete category
    async deleteCategory(req, res) {
        try {
            const deletedCategory = await Category.findByIdAndDelete(req.params.id);
            if (!deletedCategory) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.status(200).json({ message: 'Category deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error deleting category', details: error });
        }
    }
}

export default new CategoryController();