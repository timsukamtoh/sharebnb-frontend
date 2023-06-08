import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import "./NavBar.css";
import userContext from "./userContext";

/**
 * Component for NavBar
 */
function NavBar({ logout }) {
  const { currUser } = useContext(userContext);


  return (
    <nav className="navbar navbar-dark navbar-expand-sm bg-primary">
      <div className="container-fluid">
        <NavLink className="col-4 navbar-brand nav-link" to="/" end>
          Home
        </NavLink>
        <NavLink className="nav-link" to="/properties" end>
          Listings
        </NavLink>
        {!currUser
          ? <div>
            <NavLink className="nav-link" to="/login" end>Login</NavLink>
            <NavLink className="nav-link" to="/signup" end>Sign Up</NavLink>
          </div>
          : <div>
            <NavLink className="nav-link" to="/users/:username/properties" end>My Properties</NavLink>
            <NavLink className="nav-link" to="/users/:username/bookings" end>My Bookings</NavLink>
            <NavLink className="nav-link" to="/users/:username/profile" end>Profile</NavLink>
            <Link  onClick={logout} className="Logout nav-link" to="/" end>Logout {currUser.firstName}</Link>
          </div>
        }
      </div>
    </nav>
  );

}

export default NavBar;
