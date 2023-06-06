import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    async function fetchMoviestoWatchlist() {
      // let userId = localStorage.getItem('id');
      try {
        const watchlistResponse = await axios.get(`https://screen-squad.azurewebsites.net/watchlist`);
        setWatchlist(watchlistResponse.data.watchlist);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }

    fetchMoviestoWatchlist();
  }, []);

  if (!watchlist) {
    return <div>Loading...</div>
  }

  return (
    <div className="movie-grid-header">
      <h1>My Watchlist</h1>
      <div className="movie-grid">
        {watchlist.map((movie) => (
            <Link to={`/movie/${movie.movieId}`} key={movie.movieId}>
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
    );
};

export default Watchlist;
