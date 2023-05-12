import './styles/navbar.css';
import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { BiCameraMovie } from "react-icons/bi";

export default function NavBar() {
  return (
    <Navbar className="Navbar-color">
      <Container>
        <Navbar.Brand className="Navbar-form-title" as={Link} to="/">
          <BiCameraMovie className="Navbar-logo" />
          Screen Squad
        </Navbar.Brand>
          <Nav className="Navbar-form-subtitles">
            <Nav.Link className="Navbar-form-links" as={Link} to="/login">
              Log In
            </Nav.Link> 
            <Nav.Link className="Navbar-form-links" as={Link} to="/register">
              Sign Up
            </Nav.Link>
            <Nav.Link className="Navbar-form-links" as={Link} to="/">
              Home
            </Nav.Link>
          </Nav>
      </Container>
    </Navbar>
    )
}