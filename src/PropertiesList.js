import PropertyCard from "./PropertyCard";
import { useState } from "react";
import PropertyForm from "./PropertyForm";
import { useParams } from "react-router-dom";

import "./PropertiesList.css";


/** PropertiesList renders list for property
 *
 * Props:
 *    -properties | list of property objects
 *    -addProperty | func passed down from parent to handle add property
 *
 * States:
 *    -isAdding | bool to toggle Add Property button and form
 *
 * RouteList -> PropertiesList -> PropertyForm || PropertyCard
 */
function PropertiesList({properties, addProperty}) {
  const [isAdding, setIsAdding] = useState(false);
  const { username } = useParams();

  function toggleAdding() {
    setIsAdding(!isAdding);
  }

  return (
    <div className="properties-list pt-5">
      {username && !isAdding && <button className="btn btn-info m-2" onClick={toggleAdding}>Add Property</button>}
      {isAdding &&
          <div>
            <PropertyForm onSubmit={addProperty} toggleAdding={toggleAdding}/>
          </div>}
      {properties.length > 0
          ? properties.map(p => <PropertyCard key={p.id} property={p}/>)
          : <h3>No properties are listed.</h3>
      }

    </div>
  )

}

export default PropertiesList