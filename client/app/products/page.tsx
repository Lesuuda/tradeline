"use client";

import { useRouter } from 'next/navigation'; // Add this import
import { useEffect, useState } from 'react';
import '../globals.css';
import HeaderIcons from '../components/headers';
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
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [totalPages, setTotalPages] = useState(1); // Total pages from backend
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

  // Fetch all products or products by selected category with pagination
  const fetchProducts = async (categoryId: string | null = null, page: number = 1) => {
    setLoading(true);
    setError('');

    const url = categoryId
      ? `http://localhost:5000/category/${categoryId}?page=${page}&limit=20`
      : `http://localhost:5000/products?page=${page}&limit=20`; // Fetch paginated products

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        setProducts(data.products);
        setCurrentPage(data.currentPage); // Update current page from backend response
        setTotalPages(data.totalPages);   // Update total pages from backend response
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
  const fetchProductsBySearch = async (query: string, page: number = 1) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`http://localhost:5000/search?q=${query}&page=${page}&limit=60`);
      const data = await res.json();
      if (res.ok) {
        setProducts(data.products);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
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
    fetchProducts(null, currentPage);
  }, [currentPage]);

  // Handle category selection
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setCurrentPage(1); // Reset to first page when changing category
    fetchProducts(categoryId, 1); // Fetch products by selected category
  };

  // Handle page navigation (for pagination)
  const handlePageChange = (page: number) => {
    if (selectedCategoryId) {
      fetchProducts(selectedCategoryId, page);
    } else {
      fetchProducts(null, page);
    }
  };

  // Navigate to product details page
  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSelectedCategoryId(null);
    setCurrentPage(1); // Reset to first page when searching
    fetchProductsBySearch(query, 1);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 text-white">
      < HeaderIcons/>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="flex gap-6">
        {/* Categories Menu */}
        <div className="w-30 h-60">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Categories</h2>
          <ul className="space-y-2">
          <li>
            <button
              className={`py-1 px-1 w-full text-left ${!selectedCategoryId ? 'bg-purple-400 text-gray-900' : 'bg-white text-black'}`}
              onClick={() => {
                setSelectedCategoryId(null);
                setCurrentPage(1);
                fetchProducts(null, 1); // Fetch all products randomly
              }}
            >
              All
            </button>
          </li>
          {categories.map((category) => (
            <li key={category._id}>
              <button
                className={`py-1 px-1 w-full text-left ${selectedCategoryId === category._id ? 'bg-purple-400 text-gray-900' : 'bg-white text-black'}`}
                onClick={() => handleCategoryClick(category._id)}
              >
                {category.name}
              </button>
            </li>
          ))}
          </ul>
        </div>

        {/* Products List */}
        <div className="w-50 h-50">
          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products && products.length > 0 ? (
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
                      <h3 className="text-[20px] text-gray-700">{product.name}</h3>
                      {/* <p className="text-[12px] text-gray-800 text-gray-400">{product.description}</p> */}
                      <h4 className="text-[16px] text-gray-900 font-semibold">${product.price}</h4>
                      <p className="text-sm text-gray-400">{product.stock} items left</p>
                    </div>
                  ))
                ) : (
                  <p>No products available for this category.</p>
                )}
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-center mt-4">
                <button
                  className="px-4 py-2 bg-purple-400 text-white rounded mr-2"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>
                <span className="px-4 py-2 text-gray-900">Page {currentPage} of {totalPages}</span>
                <button
                  className="px-4 py-2 bg-purple-400 text-white rounded ml-2"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
