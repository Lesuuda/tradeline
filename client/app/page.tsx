"use client";

import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-500 text-white">
      <h1 className="text-6xl font-bold mb-6">Welcome to Our Store</h1> 
      <p className="text-lg mb-8">Discover our wide range of products and start shopping now!</p> 

      <div className="space-x-4">
        <button
          onClick={() => router.push('/auth?mode=login')}
          className="px-6 py-3 bg-green-600 hover:bg-green-800 text-white font-semibold rounded-lg"
        >
          Already have an account? Sign In
        </button>
        <button
          onClick={() => router.push('/auth?mode=signup')}
          className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg"
        >
          Create an account
        </button>
      </div>
    </div>
  );
};

export default Home;
