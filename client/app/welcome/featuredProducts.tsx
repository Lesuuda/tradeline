'use client'
const FeaturedProducts = () => {
    const products = [
      { name: "Summer Dress", price: "$14.39", image: "/images/dress.jpg" },
      { name: "Green Shirt", price: "$12.39", image: "/images/shirt.jpg" },
      // Add more products here
    ];
  
    return (
      <section className="py-12 px-8 bg-white">
        <h2 className="text-3xl font-semibold mb-8 text-center text-pink-500">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-lg shadow-lg text-center">
              <img src={product.image} alt={product.name} className="w-full h-56 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-pink-500 font-bold text-lg mb-4">{product.price}</p>
              <button className="bg-pink-500 text-white px-4 py-2 rounded-md">
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default FeaturedProducts;
  