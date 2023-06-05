import './styles/login.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react"
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import bcrypt from 'bcryptjs'

function Forgot (props) {
  // let [authMode, setAuthMode] = useState("login")
  // const emailInputRef = useRef();
  const [email, setEmail] = useState("");
  const [showAccountError, setShowAccountError] = useState(false);
  const navigate = useNavigate();

  async function handleForgotPassword(email) {
    
    // generate a new password
    const newPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = bcrypt.hashSync(newPassword, props.bcryptSalt) // hash created previously created upon sign up
    console.log(hashedPassword)
    try {
      const response = await axios.get('http://localhost:8000/forgot', {
        params: {email: email, hashedPassword: hashedPassword, password: newPassword}
      });
      return response;     
    }
    catch (error){
        //We're not handling errors. Just logging into the console.
        console.log(error); 
        return false;         
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailExists = await axios.get('http://localhost:8000/users/' + email);
    if(emailExists.status !== 204){
      setShowAccountError(false)
      let response = await handleForgotPassword(email);
      if(response){
        navigate('/login');
        setShowAccountError(false)
      }
    }
    else{
      setShowAccountError(true)
    }
    
    setEmail("")
    // Handle form submission here
  };

  return (
    <div className="Login-form-container">
      <form className="Login-form" onSubmit={handleSubmit} style={{boxShadow: 'rgb(0 0 0 / 50%) 1px 1px 10px'}}>
        <div className="Login-form-content">
          <h3 className="Login-form-title">Forgot Password</h3>
          <div className="text-center">
            No Account?{" "}
            <a className="link-primary"href="/register">Sign Up</a>
          </div>
          {showAccountError && <div className="error-message">No Account Found</div>}
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
          <button type="submit" className="btn btn-primary" style={{backgroundColor: 'rgb(127, 0, 255)'}}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Forgot;