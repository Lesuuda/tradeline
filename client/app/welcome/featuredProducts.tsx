'use client';
import { useEffect, useState } from 'react';

const FeaturedProducts = () => {
  const products = [
    { name: "Summer Dress", price: "$14.39", image: "/images/dress.jpg" },
    { name: "Green Shirt", price: "$12.39", image: "/images/shirt.jpg" },
    { name: "Leather Jacket", price: "$39.99", image: "/images/jacket.jpg" },
    { name: "Sneakers", price: "$29.49", image: "/images/sneakers.jpg" },
    { name: "Watch", price: "$49.99", image: "/images/watch.jpg" },
    { name: "Sunglasses", price: "$19.99", image: "/images/sunglasses.jpg" },
  ];

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 200); // Delay to trigger animation
  }, []);

  return (
    <section className="py-12 px-8 bg-white">
      <h2 className="text-3xl font-semibold mb-8 text-center text-pink-500">Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product, idx) => (
          <div
            key={idx}
            className={`bg-gray-50 p-6 rounded-lg shadow-lg text-center transition-transform duration-500 ease-out ${
              loaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 translate-y-6'
            } delay-[${idx * 100}ms]`} // Staggered delay for each product
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-cover rounded-md mb-4 transition-transform duration-300 hover:scale-105"
            />
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-pink-500 font-bold text-lg mb-4">{product.price}</p>
            <button className="bg-pink-500 text-white px-4 py-2 rounded-md transition-transform duration-300 hover:bg-pink-600 hover:scale-105">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
