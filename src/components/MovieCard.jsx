import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  if (!movie || !movie.poster_path) {
    return null;
  }

  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 hover:shadow-red-600/50 transition-all duration-300 h-full">
        <img src={imageUrl} alt={movie.title} className="w-full h-auto object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white truncate">{movie.title}</h3>
          <p className="text-yellow-400">Rating: {movie.vote_average.toFixed(1)}/10</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;