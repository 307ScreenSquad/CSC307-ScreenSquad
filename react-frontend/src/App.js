import React, {useState, useEffect} from 'react'
import Table from './Table'
import Form from './Form'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Login"
import theme from "./theme"
import Base from "./base"
import { ThemeProvider } from "@emotion/react";
function App() {
  const [characters, setCharacters] = useState([]);

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
      <>nav bar here</>
        <Routes>
          <Route path="/" element={<Base characterData={characters} removeCharacter={removeOneCharacter} handleSubmit={updateList}/>}/>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;