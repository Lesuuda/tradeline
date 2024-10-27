// headerIcons.tsx
'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CartIcon from "./cartIcon";
import OrdersIcon from "./ordersIcon";
import WelcomeUser from "./welcomeUser";
import SearchBar from "../components/searchBar";
import Image from "next/image";

const HeaderIcons = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProductsBySearch = async (query: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`http://localhost:5000/search?q=${query}&limit=60`);
      const data = await res.json();
      if (res.ok) {
        // Assuming you route to a results page
        router.push(`/search?query=${query}`);
      } else {
        alert('No products match your search query');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    fetchProductsBySearch(query);
  };

  return (
    <div className="flex items-center justify-between w-full h-20 p-4 bg-white shadow-md fixed top-0 left-0">
      {/* Logo on the Left */}
      <div className="flex items-center">
        <Image
          src="/images/logo.jpg"
          alt="Logo"
          width={100}
          height={60}
          priority
        />
      </div>

      {/* Search Bar in the Center */}
      <div className="flex-grow flex justify-center">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Right Side: WelcomeUser, OrdersIcon, and CartIcon */}
      <div className="flex items-center space-x-6">
        <WelcomeUser />
        <OrdersIcon size={30} />
        <CartIcon size={30} />
      </div>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
};

export default HeaderIcons;
