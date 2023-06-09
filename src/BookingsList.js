import BookingCard from "./BookingCard"

function BookingsList({bookings, delBooking}) {
  console.log("bookings:", bookings)
  console.log("delBooking type: ", typeof delBooking);

  return (
    <div className="BookingsList">
      {bookings.length > 0
          ? bookings.map(b => <BookingCard key={b.id} booking={b} delBooking={delBooking}/>)
          : <h3>No bookings are listed.</h3>
      }
    </div>
  )

}

export default BookingsList