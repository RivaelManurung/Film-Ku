import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [genres, setGenres] = useState([]);
  const [isGenreDropdownOpen, setGenreDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // State untuk menu mobile
  const navigate = useNavigate();
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  // Fetch genres on component mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
        );
        const data = await response.json();
        if (data.genres) {
          setGenres(data.genres);
        }
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      }
    };
    fetchGenres();
  }, [API_KEY]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
      setQuery("");
      setMobileMenuOpen(false); // Tutup menu mobile setelah search
    }
  };

  // Fungsi untuk menutup semua menu
  const closeAllMenus = () => {
    setGenreDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gray-900 bg-opacity-80 backdrop-blur-sm fixed w-full top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" onClick={closeAllMenus} className="text-2xl font-bold text-white flex-shrink-0">
            FilmKu
          </Link>

          {/* Navigasi Desktop (Medium screen and up) */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-300 hover:text-white">
              Home
            </Link>
            <Link to="/movies" className="text-gray-300 hover:text-white">
              Movies
            </Link>
            {/* Dropdown Genres Desktop */}
            <div
              className="relative"
              onMouseEnter={() => setGenreDropdownOpen(true)}
              onMouseLeave={() => setGenreDropdownOpen(false)}
            >
              <button className="text-gray-300 hover:text-white focus:outline-none flex items-center">
                Genres
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              {isGenreDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl py-2">
                  {genres.map((genre) => (
                    <Link
                      key={genre.id}
                      to={`/genre/${genre.id}/${encodeURIComponent(genre.name)}`}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-red-600 hover:text-white"
                      onClick={() => setGenreDropdownOpen(false)}
                    >
                      {genre.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
             {/* Search Bar di Desktop */}
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-gray-800 text-white px-4 py-2 w-40 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-300 focus:w-56"
              />
            </form>
          </div>
          
          {/* Tombol Hamburger untuk Mobile (Small screens) */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Navigasi Mobile (Dropdown) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 bg-opacity-95 px-4 pt-2 pb-4 space-y-2">
           {/* Search Bar di Mobile */}
          <form onSubmit={handleSearch} className="flex items-center pb-2">
            <input
              type="text"
              placeholder="Search for a movie..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 w-full rounded-full focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </form>

          <Link to="/" onClick={closeAllMenus} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">
            Home
          </Link>
          <Link to="/movies" onClick={closeAllMenus} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">
            Movies
          </Link>
          <h3 className="px-3 pt-4 pb-2 text-sm font-semibold text-gray-400 uppercase tracking-wider">Genres</h3>
          <div className="max-h-60 overflow-y-auto">
            {genres.map((genre) => (
              <Link
                key={genre.id}
                to={`/genre/${genre.id}/${encodeURIComponent(genre.name)}`}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-red-600"
                onClick={closeAllMenus}
              >
                {genre.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;