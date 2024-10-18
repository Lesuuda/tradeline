"use client";

import { useState, useEffect } from 'react';
import { useCart } from '../../cart/cartContext'; // Use the CartContext

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[]; // Added images array
}

const ProductDetails = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // For toggling images
  const [quantity, setQuantity] = useState(1);
  const cartContext = useCart(); // Get CartContext

  if (!cartContext) {
    throw new Error("CartContext is undefined");
  }

  const { addToCart } = cartContext; // Get addToCart function from CartContext

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
      addToCart(product._id, quantity); // Add to cart
    }
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
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <img
        src={`${product.images[selectedImageIndex]}`} // Display the selected image
        alt={product.name}
        className="w-full h-80 object-cover mb-4"
      />
      <div className="flex justify-between mb-4">
        <button onClick={handlePreviousImage} disabled={product.images.length <= 1}>
          Previous
        </button>
        <button onClick={handleNextImage} disabled={product.images.length <= 1}>
          Next
        </button>
      </div>
      <p className="text-lg mb-4">{product.description}</p>
      <p className="text-lg mb-4">Price: ${product.price}</p>
      <div className="flex items-center space-x-4 mb-4">
        <button
          className="px-4 py-2 bg-gray-700"
          onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          className="px-4 py-2 bg-gray-700"
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </button>
      </div>
      <button
        className="px-6 py-3 bg-blue-600 text-white rounded-lg"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;
