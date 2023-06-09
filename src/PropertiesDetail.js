import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import SharebnbApi from "./api";
import userContext from "./userContext";
import BookingForm from "./BookingForm";

/**
 * Component for rendering PropertyDetail
 *
 * Prop:
 *    -onSubmit | func passed from parent to pass down to BookingForm
 *
 * States:
 *    -property | object {data, isLoading}
 *    -isBooking | bool to determine whether to display booking form
 *
 * PropertyList -> PropertyCard -> PropertyDetail
 */
function PropertyDetail({ onSubmit }) {
  const { propertyId } = useParams();
  const [property, setProperty] = useState({ data: {}, isLoading: true });
  const [isBooking, setIsBooking] = useState(false);
  const { currUser } = useContext(userContext);

  useEffect(function getProperty() {
    async function loadProperty() {
      const newProperty = await SharebnbApi.getProperty(propertyId);
      setProperty({ data: newProperty, isLoading: false });
    }
    loadProperty();
  }, []);
  console.log(property);

  function toggleBooking() {
    setIsBooking(!isBooking);
  }

  if (property.isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>{property.data.address}</h2>
      <img src={property.data.img_url} alt={property.data.id}></img>
      <p>owner: {property.data.owner}</p>
      <p>price rate: {property.data.price_rate}</p>
      <p>sq ft: {property.data.sqft}</p>
      <p>{property.data.description}</p>
      {currUser && !isBooking && currUser.username !== property.data.owner && <div>
        <button className="btn btn-primary" onClick={toggleBooking}>Book</button>
      </div>}
      {isBooking && <BookingForm propertyId={property.data.id} onSubmit={onSubmit} />}
    </div>
  );

}

export default PropertyDetail;