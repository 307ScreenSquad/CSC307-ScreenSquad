import React from 'react'
import ReactDOMClient from 'react-dom/client'
import MyApp from './App'
// import Login from './Login'
// import MoviePage from './SingleMoviePage/MoviePage'
// import MovieSearch from './SingleMoviePage/MovieSearch'
// import NavBar from './NavBar'


const container = document.getElementById('root');

// Create a root

const root = ReactDOMClient.createRoot(container);

// Initial render:

root.render(<MyApp />);


