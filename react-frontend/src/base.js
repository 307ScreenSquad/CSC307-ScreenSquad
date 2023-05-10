import React from 'react'
import './styles/base.css';

export default function Base(props){
    return (
       <div className="centered-text">
          <div>
            <h1 className="main-heading">Welcome to Screen Squad!</h1>
            <h3 className="sub-heading">Screen Squad is a community of movie enthusiasts to watch movies together!</h3>
          </div>
       </div>
    );
}