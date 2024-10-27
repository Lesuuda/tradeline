"use client";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";

const CartIcon = ({ size = 30 }) => { // Allow icon size customization
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
        const totalItems = cartData.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        setCartItemsCount(totalItems);
      } else {
        console.error("Failed to fetch cart items count");
      }
    } catch (error) {
      console.error("Error fetching cart items count:", error);
    }
  };

  useEffect(() => {
    fetchCartItemsCount();
  }, []);

  return (
    <Link href="/cart">
      <div className="fixed top-4 right-4"> {/* Positioned top-right of the page */}
        <FaShoppingCart size={size} color="#ff69b4" /> {/* Pink icon */}
        {cartItemsCount > 0 && (
          <span
            className="absolute -top-2 -right-3 bg-white text-black text-xs rounded-full h-5 w-5 flex items-center justify-center"
          >
            {cartItemsCount}
          </span>
        )}
      </div>
    </Link>
  );
};

export default CartIcon;
