import './styles/login.css';
import "bootstrap/dist/css/bootstrap.min.css";
// import React, { useState, useRef } from "react"
import React, { useRef } from "react"

function Register (props) {
  // let [authMode, setAuthMode] = useState("login")
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const nameInputRef = useRef();
  // const changeAuthMode = () => {
  //   setAuthMode(authMode === "login" ? "signup" : "login")
  // }

  function registerNewUser(){
    props.createUser(nameInputRef.current.value, emailInputRef.current.value, passwordInputRef.current.value)
    return 0;
  }


  return (
    <div className="Login-form-container">
      <form className="Login-form">
        <div className="Login-form-content">
          <h3 className="Login-form-title">Sign In</h3>
          <div className="text-center">
            Already registered?{" "}
            <a className="link-primary"href="/login">Sign In</a>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="First and last name"
              ref = {nameInputRef}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder=""
              ref = {emailInputRef}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="at least 8 characters"
              ref = {passwordInputRef}
            />
          </div>
          <div className="form-group mt-3">
            <label>Re-enter password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder=""
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={e => {
              e.preventDefault()
              registerNewUser();
            }}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Register;