import React from 'react';

const MovieCard = ({ title, image, rating }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
      <img src={image} alt={title} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-yellow-400">Rating: {rating}/10</p>
      </div>
    </div>
  );
};

export default MovieCard;