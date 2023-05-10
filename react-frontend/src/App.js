import React, {useState, useEffect, useRef } from 'react'
import Table from './Table'
import Form from './Form'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Login"
import Register from "./Register"
import Forgot from "./Forgot"
import theme from "./theme"
import Base from "./base"
import bcrypt from 'bcryptjs'


import { ThemeProvider } from "@emotion/react";

// hashing: https://medium.com/boca-code/how-to-encrypt-password-in-your-react-app-before-you-send-it-to-the-api-6e10a06f0a8e
// SALT should be created ONE TIME upon sign up
const salt = bcrypt.genSaltSync(10)

function App() {
  const [characters, setCharacters] = useState([]);
  //const emailInputRef = useRef()
  //const passwordInputRef = useRef()

  async function handleCreateUser(name, email, password) {
    const hashedPassword = bcrypt.hashSync(password, salt) // hash created previously created upon sign up
    try {
      const response = await axios.post('http://localhost:8000/register', {name: name, email: email, password: hashedPassword});
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

  async function handleSubmitUser(email, password) {
    //const hashedPassword = bcrypt.hashSync(password, salt) // hash created previously created upon sign up
    try {
      const response = await axios.post('http://localhost:8000/login', {email: email, password: password});
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
      fetchAll().then( result => {
          if(result){
              //console.log(result);
              setCharacters(result);
          }
      })
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
        <Routes>
          <Route path="/" element={<Base characterData={characters} removeCharacter={removeOneCharacter} handleSubmit={updateList}/>}/>
          <Route path="/login" element={<Login submitUser={handleSubmitUser}/>} />
          <Route path="/register" element={<Register createUser={handleCreateUser}/>} />
          <Route path="/forgot" element={<Forgot />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;