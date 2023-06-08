import { Link } from "react-router-dom"
function PropertyCard({property}) {
  return (
    <Link to={`property/${property.id}`}>
    <div className="PropertyCard">
      <h2>{property.address}</h2>
      <img src={property.img_url} alt={property.id}></img>
      <p>price rate: {property.price_rate}</p>
    </div>
    </Link>
  )
}

export default PropertyCard