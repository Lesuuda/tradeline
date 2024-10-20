
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js'; 

const mongoURI = 'mongodb://localhost:27017/tradeline';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    seedProducts(); // Start seeding products after connection
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

async function seedProducts() {
  try {
    await Product.deleteMany({}); // Clear existing products (optional)

    // Fetch all categories from the database
    const categories = await Category.find();

    if (categories.length === 0) {
      console.error('No categories found. Please seed categories first.');
      return mongoose.connection.close(); // Close connection if no categories found
    }

    for (let i = 0; i < 1000; i++) { // Generate 1000 products
      const randomCategory = categories[Math.floor(Math.random() * categories.length)]; // Pick a random category

      const newProduct = new Product({
        name: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        price: parseFloat(faker.commerce.price()),
        stock: faker.number.int({ min: 0, max: 100 }),
        images: [
          faker.image.avatarGitHub(), // Random image URL
        ],
        category: randomCategory._id, // Assign category ID
      });

      await newProduct.save(); // Save each product
    }

    console.log('Products seeded!');
    mongoose.connection.close(); // Close connection after seeding
  } catch (error) {
    console.error('Error seeding products:', error);
  }
}
