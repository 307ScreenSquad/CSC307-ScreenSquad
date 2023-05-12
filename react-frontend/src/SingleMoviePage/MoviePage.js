import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MoviePage.css';
import { useParams } from 'react-router-dom';
// I'm going to go through this file, I want you to tell me what the code is doing

const MoviePage = () => { 
  const { movieId } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [streamingPlatforms, setStreamingPlatforms] = useState([]);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const movieResponse = axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=a43aea022f03ee960884520d48d1c5f8`);
        const castResponse = axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=a43aea022f03ee960884520d48d1c5f8`);
        const streamingPlatformsResponse = axios.get(`https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=a43aea022f03ee960884520d48d1c5f8`);

        const responses = await Promise.all([movieResponse, castResponse, streamingPlatformsResponse]); 

        setMovie(responses[0].data);
        setCast(responses[1].data.cast.map(castMember => castMember.name));
        
        setStreamingPlatforms(Object.values(responses[2].data.results.US.flatrate || {}).map(provider => provider.provider_name)); 
        

      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    }

    fetchMovieDetails();
  }, [movieId]);

  if (!movie || !cast || !streamingPlatforms) return <div>Loading...</div>;

  const { title, vote_average, genres, runtime, overview, poster_path } = movie;

  const rating = vote_average;
  const synopsis = overview;
  const poster = `https://image.tmdb.org/t/p/w500${poster_path}`;
  const genresList = genres.map(genre => genre.name).join(', ');

  return (
    <div className="movie-page">
      <img src={poster} alt={title} className="movie-page__poster" />
      <div className="movie-page__details">
        <h1>{title}</h1>
        <p>Rating: {rating}</p>
        <p>Genres: {genresList}</p>
        <p>Runtime: {runtime} minutes</p>
        <p>Synopsis: {synopsis}</p>
        <p>Cast: {cast.join(', ')}</p>
        <p>Available on: {streamingPlatforms.join(', ')}</p>
      </div>
    </div>
  );
};

export default MoviePage;