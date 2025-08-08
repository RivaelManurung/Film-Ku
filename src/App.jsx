import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <main>
        {/* Konten halaman dinamis akan dirender di sini */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;