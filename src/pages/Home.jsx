import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import komponen Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

// Import CSS Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import Hero from '../components/Hero';
import MovieCard from '../components/MovieCard';
import ErrorDisplay from '../components/ErrorDisplay';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchAllMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const [popularRes, topRatedRes, upcomingRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`),
          fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`),
          fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`)
        ]);

        if (!popularRes.ok || !topRatedRes.ok || !upcomingRes.ok) {
          throw new Error('Failed to fetch movie data. Please try again later.');
        }

        const popularData = await popularRes.json();
        const topRatedData = await topRatedRes.json();
        const upcomingData = await upcomingRes.json();

        setPopularMovies(popularData.results);
        setTopRatedMovies(topRatedData.results);
        setUpcomingMovies(upcomingData.results);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, [API_KEY]);

  // Tampilkan loading spinner jika data belum siap
  if (loading) return <LoadingSpinner />;
  // Tampilkan pesan error jika terjadi masalah
  if (error) return <ErrorDisplay message={error} />;

  // Komponen untuk section film
  const MovieCarousel = ({ title, movies, viewAllLink }) => (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
        {viewAllLink && (
          <Link to={viewAllLink} className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors text-sm">
            View All
          </Link>
        )}
      </div>
      <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        {movies.filter(movie => movie.poster_path).map((movie) => (
          <div key={movie.id} className="flex-shrink-0 w-40 sm:w-48 md:w-56">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Hero Section Slider */}
      {popularMovies.length > 0 && (
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          spaceBetween={30}
          slidesPerView={1}
          effect="fade"
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          className="h-[85vh] md:h-screen w-full"
        >
          {popularMovies.slice(0, 5).map(movie => (
            <SwiperSlide key={movie.id}>
              <Hero movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Bagian Kategori Film */}
      <MovieCarousel title="Popular Movies" movies={popularMovies} viewAllLink="/movies/popular" />
      <MovieCarousel title="Top Rated Movies" movies={topRatedMovies} viewAllLink="/movies/top-rated" />
      <MovieCarousel title="Upcoming" movies={upcomingMovies} viewAllLink="/movies/upcoming" />
    </>
  );
};

export default Home;