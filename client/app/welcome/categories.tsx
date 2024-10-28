'use client';
const Categories = () => {
  const categories = [
    { name: "Clothing", image: "/images/clothing.jpg", area: "clothing" },
    { name: "Skincare", image: "/images/skincare.jpg", area: "skincare" },
    { name: "Electronics", image: "/images/electronics.jpg", area: "electronics" },
    { name: "Furniture", image: "/images/furniture.jpg", area: "furniture" },
  ];

  return (
    <section className="py-12 px-8 bg-gray-100">
      <h2 className="text-3xl font-semibold mb-8 text-center text-pink-500">Popular Categories</h2>
      <div className="grid grid-cols-4 gap-4 auto-rows-[200px] grid-areas-layout">
        {categories.map((category, idx) => (
          <div
            key={idx}
            className={`relative group ${category.area} rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:rotate-1`}
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-xl font-semibold text-white">{category.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
