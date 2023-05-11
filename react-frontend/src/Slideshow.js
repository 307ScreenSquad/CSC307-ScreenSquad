import React, { useState, useEffect } from 'react';

const Slideshow = () => {
  const [images, setImages] = useState([
    'https://image.tmdb.org/t/p/w500/movie1.jpg',
    'https://image.tmdb.org/t/p/w500/movie2.jpg',
    'https://image.tmdb.org/t/p/w500/movie3.jpg',
    'https://image.tmdb.org/t/p/w500/movie4.jpg',
    'https://image.tmdb.org/t/p/w500/movie5.jpg'
  ]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setTimeout(() => {
      setCurrentImageIndex((currentImageIndex + 1) % images.length);
    }, 3000);

    return () => {
      clearTimeout(intervalId);
    };
  }, [currentImageIndex]);

  return (
    <div>
      <img src={images[currentImageIndex]} alt="Movie" />
    </div>
  );
};

export default Slideshow;
