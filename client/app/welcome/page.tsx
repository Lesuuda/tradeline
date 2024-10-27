"use client";

import { useRouter } from 'next/navigation';

const WelcomePage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
      <h1 className="text-6xl font-bold mb-6">Welcooome to Our Store</h1>
      <p className="text-lg mb-8">Discover our wide range of products and start shopping now!</p>

      <div className="space-x-4">
        <button
          onClick={() => router.push('/auth?mode=login')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-800 text-white font-semibold rounded-lg"
        >
          Sign In
        </button>
        <button
          onClick={() => router.push('/auth?mode=signup')}
          className="px-6 py-3 bg-green-600 hover:bg-green-800 text-white font-semibold rounded-lg"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;