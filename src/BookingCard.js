import { Link } from "react-router-dom"
/**
 * Component for rendering property card
 *
 * BookingsList -> BookingCard
 */
function BookingCard({booking, delBooking}) {

  function handleClick() {
    delBooking(booking.id);
  }

  return (
    <div className="BookingCard">
      <Link to={`/bookings/${booking.id}`}>
        <h2>{booking.address}</h2>
      </Link>
      <img src={booking.property.img_url} alt={booking.id}></img>
      <p>total price: {booking.total_price}</p>
      <button className="btn btn-danger" onClick={handleClick}>Delete</button>
    </div>
  )
}

export default BookingCard