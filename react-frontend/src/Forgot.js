import './styles/login.css';
import "bootstrap/dist/css/bootstrap.min.css";
// import React, { useState, useRef } from "react"
import React from "react"

function Forgot (props) {
  // let [authMode, setAuthMode] = useState("login")
  // const emailInputRef = useRef();

  return (
    <div className="Login-form-container">
      <form className="Login-form">
        <div className="Login-form-content">
          <h3 className="Login-form-title">Forgot Password</h3>
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
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={e => {
              e.preventDefault()
              //submitUser();
            }}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Forgot;