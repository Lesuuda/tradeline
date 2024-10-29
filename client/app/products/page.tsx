"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import '../globals.css';
import HeaderIcons from '../components/headers';
import { useCart } from '../cart/cartContext';

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
  images: string[];
  category: Category;
}

const ProductsPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();
  const cartContext = useCart();

  if (!cartContext) {
    throw new Error("CartContext is undefined");
  }

  const { addToCart } = cartContext;

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

  const fetchProducts = async (categoryId: string | null = null, page: number = 1) => {
    setLoading(true);
    setError('');

    const url = categoryId
      ? `http://localhost:5000/category/${categoryId}?page=${page}&limit=20`
      : `http://localhost:5000/products?page=${page}&limit=20`;

    try {
      const res = await fetch(url);
      
      // Check if the response is okay
      if (!res.ok) {
        const errorText = await res.text(); // Get the response as text
        throw new Error(`Error ${res.status}: ${errorText}`); // Throw an error with status code
      }

      const data = await res.json();
      setProducts(data.products);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (err: any) {
      console.error(err); // Log error for debugging
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(null, currentPage);
  }, [currentPage]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setCurrentPage(1);
    fetchProducts(categoryId, 1);
  };

  const handlePageChange = (page: number) => {
    if (selectedCategoryId) {
      fetchProducts(selectedCategoryId, page);
    } else {
      fetchProducts(null, page);
    }
  };

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  const fetchProductsBySearch = async (query: string, page: number = 1) => {
    setLoading(true);
    setError('');

    const url = `http://localhost:5000/products/search?q=${query}&page=${page}&limit=20`;

    try {
      const res = await fetch(url);
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      setProducts(data.products);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSelectedCategoryId(null);
    setCurrentPage(1);
    fetchProductsBySearch(query, 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-white">
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-100">
        <HeaderIcons />
      </div>

      <div className="p-6 pt-20">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="flex gap-6">
          <div className="w-30 h-60">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Categories</h2>
            <ul className="space-y-2">
              <li>
                <button
                  className={`py-1 px-1 w-full text-left ${!selectedCategoryId ? 'bg-purple-400 text-gray-900' : 'bg-white text-black'}`}
                  onClick={() => {
                    setSelectedCategoryId(null);
                    setCurrentPage(1);
                    fetchProducts(null, 1);
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

          <div className="w-50 h-50">
            {loading ? (
              <p>Loading products...</p>
            ) : (
              <div>
                {selectedCategoryId && products.length === 0 ? (
                  <p className="text-center text-gray-500">This category has no products listed.</p>
                ) : (
                  <div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {products.map((product) => (
                        <div
                          key={product._id}
                          className="bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer w-50 h-50 relative"
                          onClick={() => handleProductClick(product._id)}
                        >
                          <img 
                            src={`http://localhost:5000/images/phones/${product.images[0]}`} 
                            alt={product.name}
                            className="w-50 h-50 object-cover mb-4"
                          />
                          <h3 className="text-[20px] text-gray-700">{product.name}</h3>
                          <h4 className="text-[16px] text-gray-900 font-semibold">${product.price}</h4>
                          <p className="text-sm text-gray-400">{product.stock} items left</p>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product._id, 1);
                            }}
                            className="absolute bottom-2 right-2 px-6 py-3 text-black border border-black rounded-full bg-white"
                          >
                            Add to Cart
                          </button>
                        </div>
                      ))}
                    </div>

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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
