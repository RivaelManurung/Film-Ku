import React from 'react';

const ErrorDisplay = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-white text-center px-4">
      <h2 className="text-3xl font-bold text-red-500 mb-4">Oops! Something went wrong.</h2>
      <p className="text-lg text-gray-300">{message || 'Could not fetch data. Please check your connection or try again later.'}</p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-6 bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorDisplay;