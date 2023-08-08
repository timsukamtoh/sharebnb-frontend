import { Link } from "react-router-dom";
import "./PropertyCard.css";
/**
 * Component for rendering property card
 *
 * Props:
 *    -property | property object to display card
 *
 * PropertyList -> PropertyCard
 */
function PropertyCard({property}) {
  return (
    <Link className="text-decoration-none text-dark" to={`/properties/${property.id}`}>
    <div className="PropertyCard bg-secondary bg-opacity-75 rounded">
      <h2>{property.address}</h2>
      <img src={property.img_url} alt={property.id}></img>
      <p>price rate: ${property.price_rate}/day</p>
    </div>
    </Link>
  )
}

export default PropertyCard