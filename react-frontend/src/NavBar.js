import './styles/navbar.css';
import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { BiCameraMovie } from "react-icons/bi";

export default function NavBar(props) {
  return (
    <Navbar className="Navbar-color">
      <Container>
        <Navbar.Brand className="Navbar-form-title" as={Link} to="/landing">
          <BiCameraMovie className="Navbar-logo" />
          Screen Squad
        </Navbar.Brand>
          <Nav className="Navbar-form-subtitles">
            {!props.isLoggedIn && <Nav.Link className="Navbar-form-links" as={Link} to="/login">
              Log In
            </Nav.Link> }
            {props.isLoggedIn && <Nav.Link className="Navbar-form-links" as={Link} to="/">
              Welcome {" " + localStorage.name.split(" ")[0]}
            </Nav.Link>}
            {props.isLoggedIn && <Nav.Link className="Navbar-form-links" onClick ={props.logoutUser} as={Link} to="/">
              Logout
            </Nav.Link>}
          </Nav>
      </Container>
    </Navbar>
    )
}