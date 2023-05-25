import React, { useEffect, useState } from 'react';
import './styles/Landing.css';
import axios from 'axios';
import Slideshow from './Slideshow';

const Landing = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=a43aea022f03ee960884520d48d1c5f8`
      );
      setMovies(result.data.results);
    };
    fetchData();
  }, []);

  return (
    <div className="movie-grid-header">
      <h1>Popular Movies</h1>
      <Slideshow />
      <h1>Suggested for You</h1>
      <div className="movie-grid">
        {movies.map((movie) => (
          <a
            href={`https://www.example.com/movies/${movie.id}`} // Replace with the actual movie details link
            className="movie"
            key={movie.id}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Landing;
