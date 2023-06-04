import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Image, Button } from "react-bootstrap";
import "./UpcomingReleases.css";

const UpcomingReleases = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    async function fetchUpcomingMovies() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=a43aea022f03ee960884520d48d1c5f8`
        );

        const futureMovies = response.data.results.filter((movie) => {
          const movieDate = new Date(movie.release_date);
          const currentDate = new Date();
          return movieDate >= currentDate;
        });

        setUpcomingMovies(futureMovies);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    }

    fetchUpcomingMovies();
  }, []);

  if (!upcomingMovies) return <div>Loading...</div>;

  return (
    <Container fluid className="upcoming-releases">
      <Row>
        {upcomingMovies.map((movie) => (
          <Col md={3} key={movie.id}>
            <Card className="mb-4">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                fluid
              />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                  <strong>Release Date:</strong> {movie.release_date} <br />
                  <strong>Description:</strong> {movie.overview}
                </Card.Text>
                <Button variant="primary">Add to Watchlist</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default UpcomingReleases;
