import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MoviePage.css';
import { useParams } from 'react-router-dom';

const MoviePage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [streamingPlatforms, setStreamingPlatforms] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=a43aea022f03ee960884520d48d1c5f8`
        );
        const castResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=a43aea022f03ee960884520d48d1c5f8`
        );
        const streamingPlatformsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=a43aea022f03ee960884520d48d1c5f8`
        );
        const reviewsResponse = await axios.get(`http://localhost:8000/reviews/${movieId}`);

        setMovie(movieResponse.data);
        setCast(castResponse.data.cast.map((castMember) => castMember.name));
        setStreamingPlatforms(
          Object.values(streamingPlatformsResponse.data.results.US.flatrate || {}).map(
            (provider) => provider.provider_name
          )
        );
        setReviews(reviewsResponse.data.reviews);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    }

    fetchMovieDetails();
  }, [movieId]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const reviewsResponse = await axios.get(`http://localhost:8000/reviews/${movieId}`);
        setReviews(reviewsResponse.data.reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    }

    fetchReviews();
  }, [movieId]);

  const submitReview = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/reviews`, { movieId, reviewText });
  
      if (response.status === 200) {
        const newReview = { reviewText }; // Create a new review object
        setReviews([newReview, ...reviews]); // Prepend the new review to the existing reviews array
        setReviewText('');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  if (!movie || !cast || !streamingPlatforms) return <div>Loading...</div>;

  const { title, vote_average, genres, runtime, overview, poster_path } = movie;

  const rating = vote_average;
  const synopsis = overview;
  const poster = `https://image.tmdb.org/t/p/w500${poster_path}`;
  const genresList = genres.map((genre) => genre.name).join(', ');

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
      <div className="movie-page__reviews">
        <h2>Reviews</h2>
        <div className="movie-page__review-form">
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write a review..."
          />
          <button onClick={submitReview}>Submit</button>
        </div>
        <div className="movie-page">

        <div className="movie-page__reviews">
          <h2>Reviews</h2>
          {/* ... */}
          <ul>
        {reviews
          // .sort((a, b) => new Date(a.postTime) - new Date(b.postTime)) // Sort reviews by post time
          .map((review) => (
            <li key={review._id} className="movie-page__review">
              <p>{review.reviewText}</p>
              {/* <p className="review-post-time">Posted at: {review.postTime}</p> */}
            </li>
          ))}
      </ul>
        </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
