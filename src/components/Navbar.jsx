import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
      setQuery('');
    }
  };

  return (
    <nav className="bg-gray-900 bg-opacity-80 backdrop-blur-sm p-4 fixed w-full top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">
          StreamFlix
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
          {/* Link lain bisa ditambahkan nanti */}
        </div>
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </form>
      </div>
    </nav>
  );
};

export default Navbar;