"use client";
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';  // Cart icon from react-icons
import { useState } from 'react';

const Navbar = () => {
  // Mock state for cart items. You can replace this with actual cart state from a context or API.
  const [cartItems, setCartItems] = useState(3); // Change '3' to dynamic cart count in actual implementation

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-end">
      <Link href="/cart" className="relative">
        <FaShoppingCart size={24} />
        {/* Badge to show number of items */}
        {cartItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartItems}
          </span>
        )}
      </Link>
    </nav>
  );
};

export default Navbar;
