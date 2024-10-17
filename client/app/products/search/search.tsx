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
    <div className="flex justify-center my-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search products..."
        className="p-2 rounded-md text-black"
      />
      <button
        onClick={handleSearch}
        className="ml-2 bg-yellow-100 p-2 rounded-md text-white"
      >
        🔍
      </button>
    </div>
  );
};

export default SearchBar;
