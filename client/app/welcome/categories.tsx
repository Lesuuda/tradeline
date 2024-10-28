'use client'
const Categories = () => {
    const categories = [
      { name: "Clothing", image: "/images/clothing.jpg" },
      { name: "Skincare", image: "/images/skincare.jpg" },
      { name: "Electronics", image: "/images/electronics.jpg" },
      { name: "Furniture", image: "/images/furniture.jpg" },
    ];
  
    return (
      <section className="py-12 px-8 bg-gray-100">
        <h2 className="text-3xl font-semibold mb-8 text-center text-pink-500">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg shadow-lg text-center">
              <img src={category.image} alt={category.name} className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold">{category.name}</h3>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default Categories;
  