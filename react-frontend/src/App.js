import MoviePage from './SingleMoviePage/MoviePage';
import MovieSearch from './SingleMoviePage/MovieSearch';
import './App.css';
import React from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Login"
import Register from "./Register"
import Forgot from "./Forgot"
import theme from "./theme"
import Base from "./base"
import NavBar from "./NavBar"
import bcrypt from 'bcryptjs'
import { ThemeProvider } from "@emotion/react"; 


// hashing: https://medium.com/boca-code/how-to-encrypt-password-in-your-react-app-before-you-send-it-to-the-api-6e10a06f0a8e
// SALT should be created ONE TIME upon sign up
const salt = bcrypt.genSaltSync(10)

function App() {
  // const [characters, setCharacters] = useState([]);
  //const emailInputRef = useRef()
  //const passwordInputRef = useRef()

  async function handleCreateUser(name, email, password) {
    const hashedPassword = bcrypt.hashSync(password, salt) // hash created previously created upon sign up
    try {
      const response = await axios.post('http://localhost:8000/users', {name: name, email: email, password: hashedPassword});
      return response;     
    }
    catch (error){
        //We're not handling errors. Just logging into the console.
        console.log(error); 
        return false;         
    }
    /*
    fetch('https://api.sampleapis.com/beers/ale', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: hashedPassword,
      }),
    })
    */
  }

  async function handleSubmitUser(name, email, password) {
    const hashedPassword = bcrypt.hashSync(password, salt) // hash created previously created upon sign up
    try {
      const response = await axios.post('http://localhost:8000/users', {name: name, email: email, password: hashedPassword});
      return response;     
    }
    catch (error){
        //We're not handling errors. Just logging into the console.
        console.log(error); 
        return false;         
    }
    /*
    fetch('https://api.sampleapis.com/beers/ale', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: hashedPassword,
      }),
    })
    */
  }
  
  return(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element={<Base />}/>
          <Route path="/login" element={<Login submitUser={handleSubmitUser}/>} />
          <Route path="/register" element={<Register createUser={handleCreateUser}/>} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/movie/:movieId" element={<MoviePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
