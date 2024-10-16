"use client";

import { useRouter } from 'next/navigation'; // Add this import
import { useEffect, useState } from 'react';

interface Category {
  _id: string;
  name: string;
  description: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[]; // Added images array
  category: Category; // Assuming category is included
}

const ProductsPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter(); // Add router instance

  // Fetch all categories on page load
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:5000/categories');
        const data = await res.json();
        if (res.ok) {
          setCategories(data.categories);
        } else {
          throw new Error('Failed to fetch categories');
        }
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products by selected category ID
  const fetchProductsByCategory = async (categoryId: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`http://localhost:5000/category/${categoryId}`);
      const data = await res.json();
      if (res.ok) {
        setProducts(data);
      } else {
        throw new Error('Failed to fetch products for this category');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle category selection
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    fetchProductsByCategory(categoryId);
  };

  // Navigate to product details page
  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="flex gap-6">
        {/* Categories Menu */}
        <div className="w-1/4">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category._id}>
                <button
                  className={`py-2 px-4 w-full text-left ${selectedCategoryId === category._id ? 'bg-blue-500 text-white' : 'bg-gray-800'}`}
                  onClick={() => handleCategoryClick(category._id)}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Products List */}
        <div className="w-3/4">
          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.length > 0 ? (
                products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer"
                    onClick={() => handleProductClick(product._id)} // Navigate to product details page
                  >
                    <img 
                      src={`http://localhost:5000/${product.images[0]}`} // Display first image from images array
                      alt={product.name}
                      className="w-full h-40 object-cover mb-4" // Style the image
                    />
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-400">{product.description}</p>
                    <p className="text-sm text-gray-400">Price: ${product.price}</p>
                    <p className="text-sm text-gray-400">Stock: {product.stock}</p>
                  </div>
                ))
              ) : (
                <p>No products available for this category.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
