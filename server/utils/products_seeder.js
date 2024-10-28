import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mongoURI = 'mongodb://localhost:27017/tradeline';

mongoose.connect(mongoURI)
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

    // Find the "phones" category in the database
    const phonesCategory = await Category.findOne({ name: 'Phones' });
    if (!phonesCategory) {
      console.error('Phones category not found. Please add it first.');
      return mongoose.connection.close(); // Close connection if category not found
    }

    // Path to your local images folder
    const imagesFolderPath = path.join(__dirname, '../images/phones');

    // Loop through images 1 to 76, checking both .jpg and .jpeg extensions
    for (let i = 1; i <= 76; i++) {
      let imageFileName = `${i}.jpg`;
      let imagePath = path.join(imagesFolderPath, imageFileName);

      // Check if the .jpg file exists; if not, try the .jpeg extension
      if (!fs.existsSync(imagePath)) {
        imageFileName = `${i}.jpeg`;
        imagePath = path.join(imagesFolderPath, imageFileName);
      }

      // If neither .jpg nor .jpeg exists, log a warning and skip this image
      if (!fs.existsSync(imagePath)) {
        console.warn(`Image ${i}.jpg or ${i}.jpeg does not exist in ${imagesFolderPath}`);
        continue;
      }

      // Generate a random phone name using brand names and series numbers
      const brands = ['Samsung', 'iPhone', 'Redmi', 'Oppo', 'Realme', 'Nokia', 'Nothing'];
      const randomBrand = brands[Math.floor(Math.random() * brands.length)];
      const series = Math.random() > 0.5 ? Math.floor(Math.random() * 10) + 1 : String.fromCharCode(65 + Math.floor(Math.random() * 26));
      const phoneName = `${randomBrand} ${series}`;

      // Create a new product
      const newProduct = new Product({
        name: phoneName,
        description: 'A high-quality smartphone with advanced features.',
        price: parseFloat((Math.random() * (1000 - 100) + 100).toFixed(2)), // Random price between 100 and 1000
        stock: Math.floor(Math.random() * 100), // Random stock between 0 and 100
        images: [imageFileName],
        category: phonesCategory._id,
      });

      await newProduct.save(); // Save each product
      console.log(`Seeded product: ${phoneName} with image ${imageFileName}`);
    }

    console.log('All products seeded successfully!');
    mongoose.connection.close(); // Close connection after seeding
  } catch (error) {
    console.error('Error seeding products:', error);
  }
}
