//TESTING CI
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MoviePage.css";
import { useParams } from "react-router-dom";
// import Watchlist from "../WatchList/MyWatchlist";

const MoviePage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [streamingPlatforms, setStreamingPlatforms] = useState([]);
  // const [reviews, setReviews] = useState([]);
  // const [reviewText, setReviewText] = useState('');
  // Use dummy data for reviews
  const [watchlist, setWatchlist] = useState([]);
  const [reviews, setReviews] = useState([
    "Great movie!",
    "I loved it.",
    "Not bad, but could be better.",
  ]);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const movieResponse = axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=a43aea022f03ee960884520d48d1c5f8`
        );
        const castResponse = axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=a43aea022f03ee960884520d48d1c5f8`
        );
        const streamingPlatformsResponse = axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=a43aea022f03ee960884520d48d1c5f8`
        );
        //const reviewsResponse = axios.get(`http://localhost:8000/reviews/${movieId}`); // Replace with actual endpoint once made

        //const responses = await Promise.all([movieResponse, castResponse, streamingPlatformsResponse, reviewsResponse]);
        const responses = await Promise.all([
          movieResponse,
          castResponse,
          streamingPlatformsResponse,
        ]);

        setMovie(responses[0].data);
        setCast(responses[1].data.cast.map((castMember) => castMember.name));
        setStreamingPlatforms(
          Object.values(responses[2].data.results.US.flatrate || {}).map(
            (provider) => provider.provider_name
          )
        );
        //setReviews(responses[3].data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    }

    fetchMovieDetails();
  }, [movieId]);

  const submitReview = async () => {
    // try {
    //   const response = await axios.post(`http://localhost:8000/reviews/${movieId}`, { text: reviewText }); // Replace with actual endpoint once made
    //   if (response.status === 200) {
    //     setReviews([...reviews, response.data]);
    //     setReviewText('');
    //   }
    // } catch (error) {
    //   console.error('Error submitting review:', error);
    // }

    // Instead of sending the review to the server, just add it to the local state
    setReviews([...reviews, reviewText]);
    setReviewText("");
  };

  const addtoWatchlist = async() => {
    // setWatchlist((prevWatchlist) => [...prevWatchlist, movie]);
    setWatchlist([...watchlist, movie]);

  };

  if (!movie || !cast || !streamingPlatforms) return <div>Loading...</div>;

  const { title, vote_average, genres, runtime, overview, poster_path } = movie;

  const rating = vote_average;
  const synopsis = overview;
  const poster = `https://image.tmdb.org/t/p/w500${poster_path}`;
  const genresList = genres.map((genre) => genre.name).join(", ");

  return (
    <div className="movie-page">
      <img src={poster} alt={title} className="movie-page__poster" />
      <div className="movie-page__details">
        <h1>{title}</h1>
        <p><strong>Rating:</strong> {rating}</p>
        <p><strong>Genres:</strong> {genresList}</p>
        <p><strong>Runtime:</strong> {runtime} minutes</p>
        <p><strong>Synopsis:</strong> {synopsis}</p>
        <p><strong>Cast: </strong>{cast.join(", ")}</p>
        <p><strong>Available on:</strong> {streamingPlatforms.join(", ")}</p>
        <p>
          <strong>
            <a href="/watchlist" style={{color: "rgb(127, 0, 255)"}}
              onClick={() => {
                addtoWatchlist(movie)
                // isInWatchlist(movie)
              }}>
              Add to my Watchlist
            </a>
          </strong>
        </p>
      </div>
      {/* <Watchlist /> */}
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
        <ul>
          {reviews.map((review, i) => (
            <li key={i} className="movie-page__review">
              <p>{review}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MoviePage;
