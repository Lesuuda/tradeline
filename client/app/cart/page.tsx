"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HeaderIcons from "../components/headers";


const CartPage = () => {
  interface CartItem {
    product: {
      _id: string;
      name: string;
      price: number;
      images: string;
    };
    quantity: number;
  }

  interface Cart {
    items: CartItem[];
  }

  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const fetchCart = async () => {
    try {
      const response = await fetch("http://localhost:5000/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch cart");
      const data = await response.json();
      setCart(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateCartItem = async (productId: string, quantity: number) => {
    try {
      const response = await fetch("http://localhost:5000/cart/update-cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });
      if (!response.ok) throw new Error("Failed to update cart");
      await fetchCart();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const removeCartItem = async (productId: string) => {
    try {
      const response = await fetch("http://localhost:5000/cart/remove-from-cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ productId }),
      });
      if (!response.ok) throw new Error("Failed to remove item from cart");
      await fetchCart();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!cart || cart.items.length === 0) return <p>Your cart is empty</p>;

  return (
    <div className="container mx-auto py-8">
      <HeaderIcons />
      <h2 className="text-3xl font-bold text-center mb-8">Shopping Cart</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cart.items.map((item) => (
          <div key={item.product._id} className="border border-gray-300 p-4 rounded-lg shadow-md flex flex-col">
            <img
             src={`http://localhost:5000/images/phones/${item.product.images[0]}`} 
              alt={item.product.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{item.product.name}</h3>
              <p className="text-gray-700 mt-2">${item.product.price.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                className="px-3 py-1 bg-pink-200 rounded-l-lg hover:bg-gray-300"
                onClick={() => updateCartItem(item.product._id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span className="px-4">{item.quantity}</span>
              <button
                className="px-3 py-1 bg-pink-200 rounded-r-lg hover:bg-gray-300"
                onClick={() => updateCartItem(item.product._id, item.quantity + 1)}
              >
                +
              </button>
              <button
                className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => removeCartItem(item.product._id)}
              >
                Drop Item
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 border-t border-gray-300 pt-6">
        <div className="flex justify-between items-center mb-4">
          <p className="text-2xl font-bold">Total:</p>
          <p className="text-2xl font-bold">
            ${cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2)}
          </p>
        </div>
        <button
          className="w-full md:w-1/2 lg:w-1/3 mx-auto block bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          onClick={() => router.push("/checkout")}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
