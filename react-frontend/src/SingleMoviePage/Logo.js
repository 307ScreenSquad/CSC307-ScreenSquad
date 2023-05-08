import React from 'react';
import './Logo.css';

// Import the logo image
import logoImage from './assets/logo.png'; 

const Logo = () => {
  return (
    <div className="logo">
      <img src={logoImage} alt="Your Logo" />
    </div>
  );
};

export default Logo;
