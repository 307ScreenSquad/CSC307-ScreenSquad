import './styles/login.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useRef } from "react"

function Login (props) {
  let [authMode, setAuthMode] = useState("login")
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const nameInputRef = useRef();
  const changeAuthMode = () => {
    setAuthMode(authMode === "login" ? "signup" : "login")
  }

  function submitUser(){
    props.createUser(emailInputRef.current.value, passwordInputRef.current.value)
    return 0;
  }

  return (
    <div className="Login-form-container">
      <form className="Login-form">
        <div className="Login-form-content">
          <h3 className="Login-form-title">Sign In</h3>
          <div className="text-center">
            No Account?{" "}
            <a className="link-primary"href="/register">Sign Up</a>
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={e => {
              e.preventDefault()
              submitUser();
            }}>
              Submit
            </button>
          </div>
          
          <p className="text-center mt-2">
            Forgot <a href="/forgot">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;