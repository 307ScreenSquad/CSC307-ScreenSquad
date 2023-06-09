import React, { useEffect, useState } from 'react';
import './landing.css';
import axios from 'axios';
import Slideshow from './Slideshow';
import { Link } from 'react-router-dom';

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
    <div className="landing-container">
      <div className="slideshow-wrapper">
        <h1 className="slideshow-title">Discover Exciting Movies</h1>
        <Slideshow />
      </div>
      <div className="movie-grid-header">
        <h2>Popular Movies</h2>
        <div className="movie-grid">
          {movies.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <div className="movie">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
                <h3>{movie.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;
