import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

const GenrePage = () => {
  const { genreId, genreName } = useParams();
  const [movies, setMovies] = useState([]);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
      const data = await response.json();
      setMovies(data.results);
    };
    fetchMoviesByGenre();
  }, [genreId, API_KEY]);

  return (
    <div className="container mx-auto px-4 py-28">
      <h2 className="text-3xl font-bold mb-8">
        Genre: <span className="text-red-600">{decodeURIComponent(genreName)}</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies
          .filter(movie => movie.poster_path)
          .map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </div>
    </div>
  );
};

export default GenrePage;