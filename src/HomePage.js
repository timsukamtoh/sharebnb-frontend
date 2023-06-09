import React, { useContext } from "react";
import { Link } from "react-router-dom";
import userContext from "./userContext";
import "./HomePage.css";

/** HomePage renders home page
 *
 *  RouteList -> HomePage
 */

function HomePage() {
  const { currUser } = useContext(userContext);

  if (!currUser) {
    return (
      <div className="position-absolute top-50 start-50 translate-middle">
        <h4>Welcome to SharenBn!</h4>
        <button className="btn btn-success m-2 text-center">
          <Link to="/login" className=" text-decoration-none text-light">Login</Link>
        </button>
        <button className="btn btn-info m-2 text-center">
          <Link to="/signup" className=" text-decoration-none text-light">Signup</Link>
        </button>
      </div>
    );
  }
  return (
    <h1 className="text-center p-5"> Welcome back {currUser.first_name}! </h1>
  );
}

export default HomePage