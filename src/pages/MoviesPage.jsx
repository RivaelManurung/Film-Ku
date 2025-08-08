import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    // Fungsi ini mengambil film "discover", yang lebih umum daripada "popular"
    const fetchMovies = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}`);
      const data = await response.json();
      
      setMovies(prev => [...prev, ...data.results]);
      if (data.results.length === 0 || data.results.length < 20) {
        setHasMore(false);
      }
    };
    fetchMovies();
  }, [page, API_KEY]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="container mx-auto px-4 py-28">
      <h2 className="text-3xl font-bold mb-8">All Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies
          .filter(movie => movie.poster_path)
          .map((movie) => (
            <MovieCard key={`${movie.id}-${Math.random()}`} movie={movie} />
          ))}
      </div>
      {/* Tombol Load More */}
      {hasMore && (
        <div className="text-center mt-12">
          <button
            onClick={handleLoadMore}
            className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default MoviesPage;