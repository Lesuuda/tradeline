"use client";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";  // Import cart icon
import Link from "next/link";

const CartIcon = () => {
  const [cartItemsCount, setCartItemsCount] = useState(0);

  // Fetch the number of items in the cart
  const fetchCartItemsCount = async () => {
    try {
      const response = await fetch("http://localhost:5000/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const cartData = await response.json();
        const totalItems = cartData.items.reduce((total: number, item: { quantity: number }) => total + item.quantity, 0);
        setCartItemsCount(totalItems);
      } else {
        console.error("Failed to fetch cart items count");
      }
    } catch (error) {
      console.error("Error fetching cart items count:", error);
    }
  };

  useEffect(() => {
    fetchCartItemsCount(); // Fetch on component mount
  }, []);

  return (
    <Link href="/cart" className="relative">
      <FaShoppingCart size={30} color="blue-900" /> {/* Cart icon with yellow color */}
      {cartItemsCount > 0 && (
        <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {cartItemsCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
