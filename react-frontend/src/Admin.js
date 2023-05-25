import './styles/login.css';
import './styles/admin.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react"
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Sidebar from './Sidebar'
import Table from './Table'

function Admin (props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAccountError, setShowAccountError] = useState(false);
  const [showLoginError, setShowLoginError] = useState(false);
  const [checkAdmin, setCheckAdmin] = useState(false);
  const [isUsers, setIsUsers] = useState(false);
  const [buttonsActive, setButtonsActive] = useState(true);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailExists = await axios.get('http://localhost:8000/users/' + email);
    if(emailExists.status !== 204){
      setShowAccountError(false)
      let response = await props.submitUser(email, password);
      if(response){
        navigate('/landing');
        setShowLoginError(false)
      }
      else{
        setShowLoginError(true);
      }
    }
    else{
      setShowAccountError(true)
    }
    
    setEmail("")
    setPassword("")
    // Handle form submission here
  };

  async function isAdmin(){
    if(localStorage.getItem('isAdmin') === 'false'){
      setCheckAdmin(false);
      navigate('/landing')
    }
    else{
      setCheckAdmin(true);
    }

    
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
    isAdmin();
    fetchAll().then( result => {
      if(result){
          setUsers(result);
      }
    })
  })
  return (
    <div className="Admin-container" >
        <Sidebar />
        <Table bodyType = {'admin'} tableData={users} tableHeaders={['Full Name', 'Email', 'Admin Status']}/>
    </div>
  );


}

export default Admin;