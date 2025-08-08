import React, { useState, useEffect } from "react"; // Import hooks
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import MovieCard from "../components/MovieCard";
import Footer from "../components/Footer";

const Home = () => {
  // State untuk menyimpan daftar film dari API
  const [movies, setMovies] = useState([]);

  // Mengambil API Key dari environment variable
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  // useEffect akan berjalan satu kali saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        const data = await response.json();
        setMovies(data.results); // Simpan hasil dari API ke dalam state
      } catch (error) {
        console.error("Failed to fetch popular movies:", error);
      }
    };

    fetchPopularMovies();
  }, [API_KEY]); // Dependency array, efek ini berjalan lagi jika API_KEY berubah

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      {/* Kirim film pertama sebagai featured movie ke Hero */}
      {movies.length > 0 && <Hero movie={movies[0]} />}

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Popular Movies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Loop data film dari state */}
          {movies
            .filter((movie) => movie.poster_path)
            .map((movie) => (
              // Kirim seluruh objek 'movie' dalam satu prop
              <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
