import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import Category from '../models/categoryModel.js'; // Update your model imports

// Replace with your MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/tradeline';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    seedCategories();
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

async function seedCategories() {
  try {
    await Category.deleteMany({}); // Optional: Clear existing categories

    const categories = [
      { name: 'Electronics', description: 'Gadgets and devices' },
      { name: 'Fashion', description: 'Clothing and accessories' },
      { name: 'Home & Kitchen', description: 'Furniture and home decor' },
      { name: 'Sports', description: 'Sportswear and gear' },
    ];

    for (let category of categories) {
      const newCategory = new Category(category);
      await newCategory.save(); // Save each category to DB
    }

    console.log('Categories seeded!');
    mongoose.connection.close(); // Close connection after seeding
  } catch (error) {
    console.error('Error seeding categories:', error);
  }
}
