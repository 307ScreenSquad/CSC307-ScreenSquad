import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MoviePage.css';
import { useParams } from 'react-router-dom';

const MoviePage = ({ isLoggedIn }) => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [streamingPlatforms, setStreamingPlatforms] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
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

  const submitReview = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/reviews`, { movieId, reviewText });

      if (response.status === 200) {
        const newReview = { reviewText };
        setReviews([newReview, ...reviews]);
        setReviewText('');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const addtoWatchlist = async () => {
    setWatchlist([...watchlist, movie]);
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
        <p>
          <strong>Rating:</strong> {rating}
        </p>
        <p>
          <strong>Genres:</strong> {genresList}
        </p>
        <p>
          <strong>Runtime:</strong> {runtime} minutes
        </p>
        <p>
          <strong>Synopsis:</strong> {synopsis}
        </p>
        <p>
          <strong>Cast: </strong>
          {cast.join(', ')}
        </p>
        <p>
          <strong>Available on:</strong> {streamingPlatforms.join(', ')}
        </p>
        {isLoggedIn && (
          <p>
            <strong>
              <span
                style={{
                  color: 'rgb(127, 0, 255)',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
                onClick={() => addtoWatchlist(movie)}
              >
                Add to my Watchlist
              </span>
            </strong>
          </p>
        )}
      </div>

      <div className="movie-page__watchlist">
        <h2>My Watchlist</h2>
        <ul>
          {watchlist.map((movie) => (
            <p>{movie.title}</p>
          ))}
        </ul>
      </div>

      <div className="movie-page__reviews">
        <h2>Reviews</h2>
        {isLoggedIn && (
          <div className="movie-page__review-form">
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write a review..."
            />
            <button onClick={submitReview}>Submit</button>
          </div>
        )}
        <div className="movie-page">
          <div className="movie-page__reviews">
            <ul>
              {reviews.map((review, index) => (
                <li key={index} className="movie-page__review">
                  <p>{review.reviewText}</p>
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
