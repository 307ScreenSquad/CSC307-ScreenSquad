import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MoviePage.css';

const MoviePage = ({ movieId }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await axios.get(`YOUR_BACKEND_URL/movies/${movieId}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    }

    fetchMovie();
  }, [movieId]);

  // Uncomment the below two lines of code once the backend is set up.
  //if (!movie) return <div>Loading...</div>;

  // Extract required fields
//   const { title, rating, genres, runtime, synopsis, cast, poster, streamingPlatforms } = movie;
  //set the variables with test values since the backend is not working yet
    const title = "test title";
    const rating = "test rating";
    const genres = ["test genre 1", "test genre 2"];
    const runtime = "test runtime";
    const synopsis = "test synopsis";
    const cast = ["test cast 1", "test cast 2"];
    const poster = "test poster";
    const streamingPlatforms = ["test streaming platform 1", "test streaming platform 2"];
    

  // Render movie details
  return (
    <div className="movie-page">
      <img src={poster} alt={title} className="movie-page__poster" />
      <div className="movie-page__details">
        <h1>{title}</h1>
        <p>Rating: {rating}</p>
        <p>Genres: {genres.join(', ')}</p>
        <p>Runtime: {runtime} minutes</p>
        <p>Synopsis: {synopsis}</p>
        <p>Cast: {cast.join(', ')}</p>
        <p>Available on: {streamingPlatforms.join(', ')}</p>
      </div>
    </div>
  );
};

export default MoviePage;
