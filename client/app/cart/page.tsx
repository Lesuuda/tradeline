"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CartPage = () => {
  interface CartItem {
    product: {
      _id: string;
      name: string;
      price: number;
      images: string[]; // Adjusted to reflect that images is an array
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
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch cart");
      }
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
      if (!response.ok) {
        throw new Error("Failed to update cart");
      }
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
      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }
      await fetchCart();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p>Loading cart...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!cart || cart.items.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      <ul>
        {cart.items.map((item) => (
          <li key={item.product._id} className="mb-4 flex justify-between items-center">
            <div className="flex items-center">
              {/* Accessing the first image from the images array */}
              <img
                src={`${item.product.images}`} // Use the first image in the images array
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="ml-4">
                <p>{item.product.name}</p>
                <p>${item.product.price ? item.product.price.toFixed(2) : "Price not available"}</p>
              </div>
            </div>
            <div className="flex items-center">
              <button
                className="px-2 py-1 bg-gray-300 rounded"
                onClick={() => updateCartItem(item.product._id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span className="px-4">{item.quantity}</span>
              <button
                className="px-2 py-1 bg-gray-300 rounded"
                onClick={() => updateCartItem(item.product._id, item.quantity + 1)}
              >
                +
              </button>
              <button
                className="ml-4 px-2 py-1 bg-red-500 text-white rounded"
                onClick={() => removeCartItem(item.product._id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <p className="text-lg font-bold">
          Total: $
          {cart.items.reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
          ).toFixed(2)}
        </p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => router.push("/checkout")}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
