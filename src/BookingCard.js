import { Link } from "react-router-dom"
/**
 * Component for rendering property card
 *
 *  Props:
 *      -booking | booking object
 *      -delBooking | func from parent to delete booking
 *
 * BookingsList -> BookingCard
 */
function BookingCard({booking, delBooking}) {
  console.log("bookingcard", booking)
  function handleClick() {
    delBooking(booking.id);
  }

  return (
    <div className="BookingCard">
      <Link className="text-decoration-none text-dark" to={`/bookings/${booking.id}`}>
        <h2>{booking.address}</h2>
      </Link>
      <img src={booking.property.img_url} alt={booking.id}></img>
      <p>total price: {booking.total_price}</p>
      <button className="btn btn-danger" onClick={handleClick}>Delete</button>
    </div>
  )
}

export default BookingCard