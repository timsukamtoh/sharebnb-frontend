import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import userContext from "./userContext";
import "./NavBar.css";

/**
 * Component for NavBar
 */
function NavBar({ logout }) {
  const { currUser } = useContext(userContext);

  return (
    <nav className="navbar bg-primary text-white ">
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
  );

}

export default NavBar;
