import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 p-4 fixed w-full top-0 z-10 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-white">StreamFlix</div>
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-300 hover:text-white">Home</a>
          <a href="#" className="text-gray-300 hover:text-white">Movies</a>
          <a href="#" className="text-gray-300 hover:text-white">Series</a>
          <a href="#" className="text-gray-300 hover:text-white">Login</a>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search movies..."
            className="bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;