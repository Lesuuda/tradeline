"use client";

import { useRouter } from 'next/navigation'; // Add this import
import { useEffect, useState } from 'react';
import SearchBar from './search/search';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
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

  // Fetch all products or products by selected category
  const fetchProducts = async (categoryId: string | null = null) => {
    setLoading(true);
    setError('');

    const url = categoryId
      ? `http://localhost:5000/category/${categoryId}`
      : 'http://localhost:5000/products'; // Fetch all products if no category is selected

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        if (!categoryId) {
          // If no category is selected, shuffle products to display them randomly
          const shuffledProducts = data.sort(() => Math.random() - 0.5);
          setProducts(shuffledProducts);
        } else {
          setProducts(data);
        }
      } else {
        throw new Error('Failed to fetch products');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
   // Fetch products by search query
   const fetchProductsBySearch = async (query: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`http://localhost:5000/search?q=${query}`);
      const data = await res.json();
      if (res.ok) {
        setProducts(data);
      } else {
        throw new Error('No products match your search');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all products on initial page load
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle category selection
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    fetchProducts(categoryId); // Fetch products by selected category
  };

  // Navigate to product details page
  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
  };
  const handleSearch = (query: string) => {
    setSelectedCategoryId(null);
    fetchProductsBySearch(query);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 text-white">
      
        {/* SearchBar component */}
        <SearchBar onSearch={handleSearch} />
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="flex gap-6">
        {/* Categories Menu */}
        <div className="w-1/4">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Categories</h2>
          <ul className="space-y-2">
            <li>
              <button
                className={`py-2 px-4 w-full text-left ${!selectedCategoryId ? 'bg-green-500 text-gray-900' : 'bg-gray-800'}`}
                onClick={() => {
                  setSelectedCategoryId(null);
                  fetchProducts(); // Fetch all products randomly
                }}
              >
                All
              </button>
            </li>
            {categories.map((category) => (
              <li key={category._id}>
                <button
                  className={`py-2 px-4 w-full text-left ${selectedCategoryId === category._id ? 'bg-green-500 text-white' : 'bg-gray-800'}`}
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.length > 0 ? (
                products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer w-50 h-50"
                    onClick={() => handleProductClick(product._id)} // Navigate to product details page
                  >
                    <img 
                      src={`${product.images[0]}`} // Display first image from images array
                      alt={product.name}
                      className="w-50 h-50 object-cover mb-4" // Style the image
                    />
                    <h3 className="text-lg text-gray-900 font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-800 text-gray-400">{product.description}</p>
                    <p className="text-sm text-gray-900">Price: ${product.price}</p>
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
