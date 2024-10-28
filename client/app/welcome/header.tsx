'use client'
import Image from "next/image";
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
      <Image src="/images/logo.jpg" alt="Logo" width={150} height={50} />

      <nav className="space-x-6 text-lg">
        <a href="/" className="text-gray-600 hover:text-pink-500">Home</a>
        <a href="/shop" className="text-gray-600 hover:text-pink-500">Shop</a>
        <a href="/about" className="text-gray-600 hover:text-pink-500">About</a>
        <a href="/contact" className="text-gray-600 hover:text-pink-500">Contact</a>
      </nav>

      <div className="flex space-x-4">
        <button onClick={() => router.push('/auth?mode=login')} className="text-pink-500">
          Sign In
        </button>
        <button onClick={() => router.push('/auth?mode=signup')} className="bg-pink-500 text-white px-4 py-2 rounded-md">
          Sign Up
        </button>
      </div>
    </header>
  );
};

export default Header;
