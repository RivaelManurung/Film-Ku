import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { movieId } = useParams(); // Mengambil ID dari URL
  const [movie, setMovie] = useState(null);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovieDetail = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits`
      );
      const data = await response.json();
      setMovie(data);
    };
    fetchMovieDetail();
  }, [movieId, API_KEY]);

  if (!movie)
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );

  const backgroundImageUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  return (
    <div
      style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
      className="bg-cover bg-center bg-no-repeat"
    >
      <div className="bg-black bg-opacity-80 min-h-screen pt-28 pb-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full md:w-1/3 rounded-lg shadow-lg"
          />
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              {movie.title} ({new Date(movie.release_date).getFullYear()})
            </h1>
            <p className="text-gray-400 italic mb-4">{movie.tagline}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <h2 className="text-2xl font-semibold mb-2">Overview</h2>
            <p className="text-gray-300 mb-6">{movie.overview}</p>
            <div className="text-lg">
              <p>
                <span className="font-bold">Rating:</span>{" "}
                {movie.vote_average.toFixed(1)} / 10
              </p>
              <p>
                <span className="font-bold">Runtime:</span> {movie.runtime}{" "}
                minutes
              </p>
              <p>
                <span className="font-bold">Status:</span> {movie.status}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
