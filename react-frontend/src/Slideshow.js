import React, { useState, useEffect } from "react";
import "./styles/Slideshow.css";

const Slideshow = () => {
  const [images, setImages] = useState([
    // 'https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg',
    "https://image.tmdb.org/t/p/original/9yBVqNruk6Ykrwc32qrK2TIE5xw.jpg",
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
    <div className="slideshow-container">
      <img
        src={images[currentImageIndex]}
        alt="Movie"
        className="slideshow-image"
      />
    </div>
  );
};

export default Slideshow;
