import React from 'react'
import ReactDOMClient from 'react-dom/client'
import MyApp from './App'
import Login from './Login'
import MoviePage from './SingleMoviePage/MoviePage'
import MovieSearch from './SingleMoviePage/MovieSearch'
import Logo from './SingleMoviePage/Logo'
import './styles/index.css'

const container = document.getElementById('root');

// Create a root

const root = ReactDOMClient.createRoot(container);

// Initial render:

//root.render(<MyApp />);
//root.render(<Login />);
//root.render(<MovieSearch />);
//root.render(<MoviePage />);
root.render(<Logo />);

