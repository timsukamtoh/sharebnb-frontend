import PropertyCard from "./PropertyCard";

function PropertiesList({properties}) {
  console.log("properties:", properties)
  return (
    <div className="PropertiesList">
      {properties.length > 0
          ? properties.map(p => <PropertyCard key={p.id} property={p}/>)
          : <h3>No properties are listed.</h3>
      }
    </div>
  )

}

export default PropertiesList