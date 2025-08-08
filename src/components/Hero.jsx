import React from 'react';

// Terima 'movie' sebagai prop
const Hero = ({ movie }) => {
  if (!movie) {
    return (
      <div className="h-screen bg-gray-800 flex items-center justify-center">
        <p className="text-white text-2xl">Loading featured movie...</p>
      </div>
    );
  }
  
  // Buat URL background image dari data movie
  const backgroundImageUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url('${backgroundImageUrl}')` }}>
      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center">
        <div className="container mx-auto px-4">
          {/* Gunakan data dari prop 'movie' */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{movie.title}</h1>
          <p className="text-lg text-gray-300 mb-6 max-w-2xl">{movie.overview}</p>
          <button className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors">
            Watch Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;