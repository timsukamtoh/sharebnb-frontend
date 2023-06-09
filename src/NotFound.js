import React, { useContext } from "react";
import { Link } from "react-router-dom";

/** NotFound page for any case of inappropriate pages
 *
 * JoblyRoutes -> NotFound
*/

function NotFound() {

  return(
    <div className="NotFound p-5">
      <h4 className="text-center">The page you are looking for cannot be found</h4>
      <p className="text-center">click<Link to="/"> here</Link>to go back home.</p>
    </div>
  )
}

export default NotFound