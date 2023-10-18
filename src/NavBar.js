import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavBar from 'react-bootstrap/NavBar';

import userContext from "./userContext";
import "./NavBar.css";

/**
 * Component for NavBar
 *
 * Prop:
 *    -logout | func passed from parent to handle logout
 *
 * App -> NavBar
 */
function Navbar({ logout }) {
  const { currUser } = useContext(userContext);

  return (
    <Navbar bg="primary" data-bs-theme="dark" collapseOnSelect expand="lg" className="bg-body-tertiary w-100 sticky-top">
      <Container>
        <Navbar.Brand href="/" className="text-secondary"><strong>ShareNbN</strong></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          {!currUser
            ? <Nav>
                <Nav.Link href="/properties">Listings</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">Signup</Nav.Link>
              </Nav>
            : <Nav>
                <Nav.Link href="/properties">Listings</Nav.Link>
                <Nav.Link href={`/users/${currUser.username}/properties`}>My Properties</Nav.Link>
                <Nav.Link href={`/users/${currUser.username}/bookings`}>My Bookings</Nav.Link>
                <Nav.Link href={`/users/${currUser.username}/profile`}>Profile</Nav.Link>
                <Link href="/" className="nav-item nav-link" onClick={logout}>Logout {currUser.first_name}</Link>
              </Nav>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

}
/**
 * <nav className="navbar bg-success text-white ">
      <NavLink className="col-5 navbar-brand nav-link text-white" to="/" >
        Home
      </NavLink>
      {!currUser
        ? <div className="d-flex flex-row m-2">
          <NavLink
            className="text-white m-2 text-decoration-none"
            to="/properties" >Listings
          </NavLink>
          <NavLink
            className="text-white m-2 text-decoration-none"
            to="/login" >Login
          </NavLink>
          <NavLink
            className="text-white m-2 text-decoration-none"
            to="/signup" >Sign Up
          </NavLink>
        </div>
        : <div className="d-flex flex-row m-2">
          <NavLink
            className="text-white m-2 text-decoration-none"
            to="/properties" >Listings
          </NavLink>
          <NavLink
            className="text-white m-2 text-decoration-none"
            to={`/users/${currUser.username}/properties`} >My Properties
          </NavLink>
          <NavLink
            className="text-white m-2 text-decoration-none"
            to={`/users/${currUser.username}/bookings`} >My Bookings
          </NavLink>
          <NavLink
            className="text-white m-2 text-decoration-none"
            to={`/users/${currUser.username}/profile`} >Profile
          </NavLink>
          <Link
            onClick={logout}
            className="Logout m-2 text-white text-decoration-none"
            to="/" >Logout {currUser.first_name}
          </Link>
        </div>
      }
    </nav>
 */
export default Navbar;
