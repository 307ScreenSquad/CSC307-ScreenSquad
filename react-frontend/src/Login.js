import './styles/login.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useRef } from "react"
import {useNavigate} from 'react-router-dom'

function Login (props) {
  let [authMode, setAuthMode] = useState("login")
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const changeAuthMode = () => {
    setAuthMode(authMode === "login" ? "signup" : "login")
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let response = await props.submitUser(email, password);
    if(response){
      navigate('/');
    }
    setFullName("")
    setEmail("")
    setPassword("")
    // Handle form submission here
  };


  return (
    <div className="Login-form-container">
      <form className="Login-form" onSubmit={handleSubmit}>
        <div className="Login-form-content">
          <h3 className="Login-form-title">Login</h3>
          <div className="text-center">
            No Account?{" "}
            <a className="link-primary" href="/register">Sign Up</a>
          </div>
          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder=""
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder=""
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <div className="text-center">
            Forgot{" "}
            <a className="link-primary"href="/Forgot">password?</a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;