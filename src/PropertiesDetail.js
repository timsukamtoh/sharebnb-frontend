import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import SharebnbApi from "./api";
import userContext from "./userContext";
import BookingForm from "./BookingForm";

/**
 * Component for rendering PropertyDetail
 *
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
      <p>price rate: {property.data.price_rate}</p>
      <p>sq ft: {property.data.sqft}</p>
      <p>{property.data.description}</p>
      {currUser && !isBooking && <div>
        <button className="btn btn-primary" onClick={toggleBooking}>Book</button>
      </div>}
      {isBooking && <BookingForm propertyId={property.data.id} onSubmit={onSubmit} />}
    </div>
  );

}

export default PropertyDetail;