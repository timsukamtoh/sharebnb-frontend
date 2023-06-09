import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import SharebnbApi from "./api";
import userContext from "./userContext";

/**
 * Component for rendering BookingDetail
 *
 */
function BookingDetail() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState({ data: {}, isLoading: true });
  const { currUser } = useContext(userContext);

  useEffect(function getBooking() {
    async function loadBooking() {
      const newBooking = await SharebnbApi.getBooking(bookingId);
      console.log("newBooking", newBooking)
      setBooking({ data: newBooking.booking, isLoading: false });
    }
    loadBooking();
  }, []);


  if (booking.isLoading) return <div>Loading...</div>;
  console.log("detail page", booking);
  return (
    <div>
      <h2>{booking.data.address}</h2>
      <img src={booking.data.property.img_url} alt={booking.data.id}></img>
      <p>total price: {booking.data.total_price}</p>
      <p>start date: {booking.data.start_date}</p>
      <p>end date: {booking.data.end_date}</p>
    </div>
  );

}

export default BookingDetail;