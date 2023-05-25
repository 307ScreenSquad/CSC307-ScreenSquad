import React, { useState } from 'react';

// This will be the backend portion later
// 
const Watchlist = () => {
  const [watchlist] = useState([]);

  if (!watchlist) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>My Watchlist</h1>
      {watchlist.map((movie) => (
        <div key={movie.id}>
          <h3>{movie.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default Watchlist;
