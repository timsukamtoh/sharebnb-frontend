import PropertyCard from "./PropertyCard";
import { useState } from "react";
import PropertyForm from "./PropertyForm";
import { useParams } from "react-router-dom";


function PropertiesList({properties, addProperty}) {
  const [isAdding, setIsAdding] = useState(false);
  const { username } = useParams();

  function toggleAdding() {
    setIsAdding(!isAdding);
  }

  return (
    <div className="PropertiesList">
      {username && !isAdding && <button className="btn btn-info" onClick={toggleAdding}>Add Property</button>}
      {isAdding &&
          <div>
            <PropertyForm onSubmit={addProperty} />
            <button className="btn btn-danger" onClick={toggleAdding}>Cancel</button>
          </div>}
      {properties.length > 0
          ? properties.map(p => <PropertyCard key={p.id} property={p}/>)
          : <h3>No properties are listed.</h3>
      }

    </div>
  )

}

export default PropertiesList