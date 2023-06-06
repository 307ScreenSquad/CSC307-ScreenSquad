import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MoviePage.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Button,
  Card,
  ListGroup,
  ListGroupItem,
  Image,
  Container,
  Row,
  Col,
  FormControl,
  Alert,
} from "react-bootstrap";
  
const MoviePage = ({ isLoggedIn }) => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [streamingPlatforms, setStreamingPlatforms] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const navigate = useNavigate();


  // const navigate = useNavigate();


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
        const reviewsResponse = await axios.get(
          `http://localhost:8000/reviews/${movieId}`
        );
        const watchlistResponse = await axios.get(
          `http://localhost:8000/watchlist`
        );
        
        setMovie(movieResponse.data);
        setCast(castResponse.data.cast.map((castMember) => castMember.name));
        setStreamingPlatforms(
          Object.values(
            streamingPlatformsResponse.data.results.US.flatrate || {}
          ).map((provider) => provider.provider_name)
        );
        setReviews(reviewsResponse.data.reviews);
        setWatchlist(watchlistResponse.data.watchlist);

      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    }

    fetchMovieDetails();
  }, [movieId]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const reviewsResponse = await axios.get(
          `http://localhost:8000/reviews/${movieId}`
        );
        setReviews(reviewsResponse.data.reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }

    fetchReviews();
  }, [movieId]);
  const submitReview = async () => {
    let userId = localStorage.getItem("id");

    try {
      const response = await axios.post(`http://localhost:8000/reviews`, {
        movieId,
        reviewText,
        userId: userId
      });
  
      if (response.status === 200) {
        const newReview = { reviewText };
        setReviews([newReview, ...reviews]);
        setReviewText("");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  // adding to watchlist locally
  const addtoWatchlist = async () => {
    let userId = localStorage.getItem("id");
    try {
      const response = await axios.post(`http://localhost:8000/watchlist`, {
        movieId,
        title,
        poster_path,
        userId,
      });

      if (response.status === 200) {
        const newMovie = { movieId, title, poster_path, userId };
        setWatchlist([newMovie, ...watchlist]);
      }
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  function handleNavigate(input) {
    if (input) {
      navigate("/login");
      return;
    }
    navigate("/register");
    return;
  }


  if (!movie || !cast || !streamingPlatforms) return <div>Loading...</div>;

  const { title, vote_average, genres, runtime, overview, poster_path } = movie;

  const rating = vote_average;
  const synopsis = overview;
  const poster = `https://image.tmdb.org/t/p/w500${poster_path}`;
  const genresList = genres.map((genre) => genre.name).join(", ");

    function handleNavigate(input){
      if(input){
        navigate("/login")
        return;
      }
      navigate("/register");
      return;
    }

  return (
    <Container fluid className="movie-page">
      <Row>
        <Col md={4}>
          <Image src={poster} alt={title} fluid rounded />
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>
                <h1>{title}</h1>
              </Card.Title>
              <Card.Text>
                <strong>Rating:</strong> {rating} <br />
                <strong>Genres:</strong> {genresList} <br />
                <strong>Runtime:</strong> {runtime} minutes <br />
                <strong>Synopsis:</strong> {synopsis} <br />
                <strong>Cast:</strong> {cast.join(", ")} <br />
                <strong>Available on:</strong> {streamingPlatforms.join(", ")}{" "}
                <br />
              </Card.Text>
              <Button
                variant="primary"
                as={Link}
                to="/watchlist"
                onClick={() => addtoWatchlist(movie)}
              >
                Add to my Watchlist
              </Button>
            </Card.Body>
          </Card>
          <Card className="movie-page__watchlist">
            <Card.Header as="h5">My Watchlist</Card.Header>
            <ListGroup variant="flush">
              {watchlist.map((movie) => (
                <ListGroupItem>{movie.title}</ListGroupItem>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="movie-page__reviews">
            <Card.Header as="h5">Reviews</Card.Header>
            {isLoggedIn &&
            <Card.Body>
              <FormControl
                as="textarea"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write a review..."
              />
              <Button className="mt-3" variant="primary" onClick={submitReview}>
                Submit
              </Button>
              <ListGroup className="mt-3">
                {reviews.map((review, index) => (
                  <ListGroupItem key={index}>{review.reviewText}</ListGroupItem>
                ))}
              </ListGroup>
            </Card.Body>
            }
            {!isLoggedIn && 
              <Card.Body className="movie-page__noLogin">
                <Card.Header as= "h4">To make a review, please Sign Up or Login</Card.Header>
                <div className="movie-page__noLogin_button_container">
                  <Button onClick={() => {handleNavigate(0)}}>Sign Up</Button>
                  <Button onClick={() => {handleNavigate(1)}}>Login</Button>
                </div>
              </Card.Body>
            }
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
