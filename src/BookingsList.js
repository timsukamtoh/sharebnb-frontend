import BookingCard from "./BookingCard"

import "./PropertiesList.css"
/** BookingsList renders list of bookings for user
 *
 * Props:
 *    -bookings | list of booking objects
 *    -delBooking | func passed down from parent to handle deleting booking
 *
 * RouteList -> BookingsList -> BookingCard
 */
function BookingsList({bookings, delBooking}) {
  console.log("bookings:", bookings)
  console.log("delBooking type: ", typeof delBooking);

  return (
    <div className="properties-list pt-5">
      {bookings.length > 0
          ? bookings.map(b => <BookingCard key={b.id} booking={b} delBooking={delBooking}/>)
          : <h3>No bookings are listed.</h3>
      }
    </div>
  )

}

export default BookingsList