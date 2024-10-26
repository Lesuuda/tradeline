"use client";

import { useState, useEffect } from 'react';
import { useCart } from '../../cart/cartContext';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
}

const ProductDetails = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const cartContext = useCart();

  if (!cartContext) {
    throw new Error("CartContext is undefined");
  }

  const { addToCart } = cartContext;

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`http://localhost:5000/products/${params.id}`);
      const data = await res.json();
      if (res.ok) {
        setProduct(data);
      } else {
        console.error('Failed to fetch product');
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product._id, quantity);
    }
  };

  const handleAddToWishlist = () => {
    // Wishlist functionality can be implemented here
    console.log("Added to wishlist");
  };

  if (!product) return <p>Loading product details...</p>;

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  const handlePreviousImage = () => {
    setSelectedImageIndex(
      (prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white text-gray-900 rounded-lg shadow-lg w-[48rem]">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <img
          src={product.images[selectedImageIndex]}
          alt={product.name}
          className="w-full h-64 object-cover mb-4 rounded"
        />
        <p className="text-lg mb-4">{product.description}</p>
        <p className="text-lg mb-4 font-bold">Price: ${product.price}</p>
        <div className="flex items-center space-x-4 mb-4">
          <button
            className="px-4 py-2 bg-purple-200 text-gray-800 rounded"
            onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            className="px-4 py-2 bg-purple-200 text-gray-800 rounded"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>
        <div className="flex space-x-80">
          <button
            className="flex items-center justify-center px-6 py-6 bg-purple-500 text-white rounded-lg w-60 h-20"
            onClick={handleAddToCart}
          >
            <FaShoppingCart className="mr-2" /> Add to Cart
          </button>
          <button
            className="flex items-center justify-center px-6 py-3 bg-rose-500 text-white rounded-lg w-60 h-20"
            onClick={handleAddToWishlist}
          >
            <FaHeart className="mr-2" /> Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
