import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    if (query) {
      const fetchSearchResults = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
        const data = await response.json();
        setResults(data.results);
      };
      fetchSearchResults();
    }
  }, [query, API_KEY]);

  return (
    <div className="container mx-auto px-4 py-28">
      <h2 className="text-3xl font-bold mb-8">
        Search Results for: <span className="text-red-600">{query}</span>
      </h2>
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {results.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie} // Kirim seluruh objek movie
            />
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;