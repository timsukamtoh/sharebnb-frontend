import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "./Alert";

/** Component for rendering Booking form
 *
 * Prop:
 *    -propertyId | property ID to make booking for
 *    -onSubmit | func passed down from parent to handle submit
 *
 * States:
 *    -formData | form data
 *    -alertMsgs | messages for alerts if needed
 *
 * PropertyCard -> BookingForm && PropertyDetail
 */
function BookingForm({ propertyId, onSubmit }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [alertMsgs, setAlertMsgs] = useState([]);
  console.log("formData: ", formData);
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData,
      [name]: value,
    }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    const submitData = new FormData();
    submitData.append('start_date', formData.startDate);
    submitData.append('end_date', formData.endDate);

    try {
      await onSubmit(propertyId, submitData);
      setFormData({});
      navigate("/");
    } catch (err) {
      console.log("form err", err);
      setAlertMsgs(err);
    }
  }

  console.log("AlertMsgs: ",alertMsgs)
  console.log("alertMsgs.length = ", alertMsgs.length)

  return (
    <div className="BookingForm m-2">
      {alertMsgs.length > 0 && <Alert alertMsgs={alertMsgs} />}
      <div className="form body ">
        <form encType="multipart/form" onSubmit={handleSubmit}>
          <label htmlFor="startDate">Start Date:</label>
          <input id="startDate" name="startDate" type="date" onChange={handleChange} />
          <br/>
          <label htmlFor="endDate">End Date:</label>
          <input id="endDate" name="endDate" type="date" onChange={handleChange} />
          <br/>
          <button className="btn btn-success">Submit</button>
          <Link className="btn btn-warning" to={'/properties'}>Cancel</Link>
        </form>
      </div>
    </div>

  );
}

export default BookingForm;