import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App";
import Home from "./pages/Home";
// Kita akan buat halaman lain nanti
import SearchResults from "./pages/SearchResults";
import MovieDetail from "./pages/MovieDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Layout utama
    children: [
      {
        index: true, // Halaman default (/)
        element: <Home />,
      },
      { path: "search", element: <SearchResults /> },
      { path: "movie/:movieId", element: <MovieDetail /> }, // Tambahkan rute ini
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
