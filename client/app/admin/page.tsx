"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AdminProductPage = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });
  const [images, setImages] = useState<FileList | null>(null); // Store selected images
  const router = useRouter();

  const handleChange = (e: any) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: any) => {
    setImages(e.target.files); // Set images
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();

    // Append form data
    for (const key in productData) {
      formData.append(key, productData[key]);
    }

    // Append images
    if (images) {
      Array.from(images).forEach((file) => {
        formData.append("images", file);
      });
    }

    // Send POST request to backend
    const response = await fetch("http://localhost:5000/admin/products/add-product", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    if (response.ok) {
      // Redirect after success
      router.push("/admin/products");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={productData.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={productData.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={productData.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category ID"
          value={productData.category}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          value={productData.stock}
          onChange={handleChange}
          required
        />
        <input type="file" multiple onChange={handleImageChange} />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AdminProductPage;
