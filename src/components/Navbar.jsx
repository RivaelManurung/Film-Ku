import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [genres, setGenres] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  // Fetch genres on component mount
  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
      );
      const data = await response.json();
      setGenres(data.genres);
    };
    fetchGenres();
  }, [API_KEY]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
      setQuery("");
    }
  };

  return (
    <nav className="bg-gray-900 bg-opacity-80 backdrop-blur-sm p-4 fixed w-full top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">
          FilmKu
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-300 hover:text-white">
            Home
          </Link>

          {/* TAMBAHKAN LINK INI */}
          <Link to="/movies" className="text-gray-300 hover:text-white">
            Movies
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="text-gray-300 hover:text-white focus:outline-none">
              Genres
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl">
                {genres.map((genre) => (
                  <Link
                    key={genre.id}
                    to={`/genre/${genre.id}/${encodeURIComponent(genre.name)}`}
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-red-600 hover:text-white"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            placeholder="Search for a movie..."
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
