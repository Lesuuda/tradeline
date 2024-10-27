'use client'
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="flex items-center justify-center my-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search Tradeline..."
        className="p-3 rounded-md text-black w-96 h-12 border-2 border-black-500 focus:outline-none focus:ring-2 focus:ring-pink-500" 
      />
      <button
        onClick={handleSearch}
        className="ml-2 bg-purple-500 p-2 rounded-md text-white hover:bg-pink-600 transition duration-300"
      >
        🔎
      </button>
    </div>
  );
};

export default SearchBar;
