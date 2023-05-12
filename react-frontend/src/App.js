import React, { useState, useEffect } from "react"
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
  const [characters, setCharacters] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  // const [characters, setCharacters] = useState([]);
  //const emailInputRef = useRef()
  //const passwordInputRef = useRef()

  async function handleCreateUser(name, email, password) {
    const hashedPassword = bcrypt.hashSync(password, salt) // hash created previously created upon sign up
    try {
      const response = await axios.post('http://localhost:8000/register', {name: name, email: email, password: hashedPassword});
      if(response.status == 201){
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        setLoggedIn(true);
      }
      return response;     
    }
    catch (error){
        //We're not handling errors. Just logging into the console.
        console.log(error); 
        return false;         
    }
  }

  async function handleSubmitUser(email, password) {
    //const hashedPassword = bcrypt.hashSync(password, salt) // hash created previously created upon sign up
    try {
      const response = await axios.post('http://localhost:8000/login', {email: email, password: password});
      if(response){
        const findUserResponse = await axios.get('http://localhost:8000/users/' + email);
        console.log("find user", findUserResponse);
        localStorage.setItem('name', findUserResponse.data.name);
        localStorage.setItem('email', findUserResponse.data.name);
        setLoggedIn(true);
        
      }
      return response;     
    }
    catch (error){
        //We're not handling errors. Just logging into the console.
        console.log(error); 
        return false;         
    }
  }
  async function handleLogoutUser(){
    try {
      const response = await axios.post('http://localhost:8000/logout');
      if(response){
        localStorage.setItem('name', '');
        localStorage.setItem('email', '');
        setLoggedIn(false);
        
      }
      return response;     
    }
    catch (error){
        //We're not handling errors. Just logging into the console.
        console.log(error); 
        return false;         
    }
  }

  function removeOneCharacter (index) {
    const updated = characters.filter(async (character, i) => {
        if(i === index){
          console.log(character);
          await axios.delete('http://localhost:8000/users/' + character._id);
        }
        return i !== index
    });
    setCharacters(updated);
  }
  

  function updateList(person) {
    makePostCall(person).then(result => {
      if(result && result.status === 201){
        setCharacters([...characters, person]);
      }
    })
    
  }

  async function fetchAll(){
    try {
       const response = await axios.get('http://localhost:8000/users');
       return response.data.users_list;
    }
    catch (error){
       //We're not handling errors. Just logging into the console.
       console.log(error); 
       return false;         
    }
  }
  useEffect(() => {
    const existingName = localStorage.getItem('name');
    if(existingName){
      console.log("Welcome " + existingName);
      setLoggedIn(true);
    }
  })

  async function makePostCall(person){
    try {
       const response = await axios.post('http://localhost:8000/users', person);
       return response;     
    }
    catch (error){
       //We're not handling errors. Just logging into the console.
       console.log(error); 
       return false;         
    }
  }

  /*
  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter}/>
      <Form handleSubmit={updateList}/>
    </div>
  );
  */
  return(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <NavBar isLoggedIn={loggedIn} logoutUser={handleLogoutUser}/>
        <Routes>
          <Route path="/" element={<Base />}/>
          <Route path="/login" element={<Login submitUser={handleSubmitUser}/>} />
          <Route path="/register" element={<Register createUser={handleCreateUser}/>} />
          <Route path="/forgot" element={<Forgot />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;