import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import MovieCard from '../components/MovieCard';
import { Link } from 'react-router-dom';

const Home = () => {
  // Kita tetap ambil beberapa film untuk ditampilkan di Hero dan sebagai teaser
  const [popularMovies, setPopularMovies] = useState([]);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchTeaserMovies = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
      const data = await response.json();
      // Simpan hanya beberapa film untuk ditampilkan (misalnya 8 film)
      setPopularMovies(data.results.slice(0, 8)); 
    };
    fetchTeaserMovies();
  }, [API_KEY]);

  return (
    <>
      {/* Hero section tetap menggunakan film pertama dari daftar populer */}
      {popularMovies.length > 0 && <Hero movie={popularMovies[0]} />}

      {/* Bagian ini menjadi "teaser" atau film unggulan */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Popular Movies</h2>
          <Link to="/movies" className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {popularMovies
            .filter(movie => movie.poster_path)
            .map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;