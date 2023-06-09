import './navbar.css';
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
        <Nav className="ml-auto">
          {!props.isLoggedIn && (
            <Nav.Link className="Navbar-form-links" as={Link} to="/login">
              Log In
            </Nav.Link>
          )}
          {props.isLoggedIn && (
            <>
              <Nav.Link className="Navbar-form-links" as={Link} to="/upcoming">
                Upcoming Releases
              </Nav.Link>
              <Nav.Link className="Navbar-form-links" as={Link} to="/watchlist">
                My Watchlist
              </Nav.Link>
              <Nav.Link className="Navbar-form-links" as={Link} to="/profile">
                Welcome {" " + localStorage.name.split(" ")[0] + "!"}
              </Nav.Link>
              <Nav.Link className="Navbar-form-links" onClick={props.logoutUser} as={Link} to="/" >
                Logout
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}