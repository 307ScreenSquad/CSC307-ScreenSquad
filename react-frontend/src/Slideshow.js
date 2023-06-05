import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/Slideshow.css';
import axios from 'axios';

const Slideshow = () => {
  const [movies, setMovies] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/movie/popular?api_key=a43aea022f03ee960884520d48d1c5f8'
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const intervalId = setTimeout(() => {
      setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 10000);

    return () => {
      clearTimeout(intervalId);
    };
  }, [currentMovieIndex, movies.length]);

  const goToNextMovie = () => {
    setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  const goToPreviousMovie = () => {
    setCurrentMovieIndex((prevIndex) =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  };

  if (movies.length === 0) {
    return <div>Loading...</div>;
  }

  const currentMovie = movies[currentMovieIndex];

  return (
    <div className="slideshow-container">
      <Link to={`/movie/${currentMovie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/original/${currentMovie.backdrop_path}`}
          alt={currentMovie.title}
          className="slideshow-image"
        />
      </Link>
      <div className="slideshow-description">
        <h2>{currentMovie.title}</h2>
        <p>{currentMovie.overview}</p>
      </div>
      <div className="slideshow-arrows">
        <button onClick={goToPreviousMovie}>&lt;</button>
        <button onClick={goToNextMovie}>&gt;</button>
      </div>
    </div>
  );
};

export default Slideshow;
