import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";

import userContext from "./userContext";

/**
 * Component for NavBar
 */
function NavBar({ logout }) {
  const { currUser } = useContext(userContext);

  return (
    <nav className="navbar navbar-dark navbar-expand-sm bg-primary">
      <div className="container-fluid">
        <NavLink className="col-4 navbar-brand nav-link" to="/" >
          Home
        </NavLink>
        <NavLink className="nav-link" to="/properties" >
          Listings
        </NavLink>
        {!currUser
          ? <div>
            <NavLink className="nav-link" to="/login" >Login</NavLink>
            <NavLink className="nav-link" to="/signup" >Sign Up</NavLink>
          </div>
          : <div>
            <NavLink className="nav-link" to={`/users/${currUser.username}/properties`} >My Properties</NavLink>
            <NavLink className="nav-link" to={`/users/${currUser.username}/bookings`} >My Bookings</NavLink>
            <NavLink className="nav-link" to={`/users/${currUser.username}/profile`} >Profile</NavLink>
            <Link  onClick={logout} className="Logout nav-link" to="/" >Logout {currUser.first_name}</Link>
          </div>
        }
      </div>
    </nav>
  );

}

export default NavBar;
