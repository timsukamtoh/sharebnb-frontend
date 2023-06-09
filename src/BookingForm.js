import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

/** Component for rendering Booking form */
function BookingForm({ propertyId, onSubmit }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({})
  const [alertMsgs, setAlertMsgs] = useState([]);

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
      setAlertMsgs(err);
    }
  }

  return (
    <div className="BookingForm m-2">
      <form encType="multipart/form" onSubmit={handleSubmit}>
        <label htmlFor="startDate">Start Date:</label>
        <input id="startDate" name="startDate" type="date" onChange={handleChange}/>
        <label htmlFor="endDate">End Date:</label>
        <input id="endDate" name="endDate" type="date" onChange={handleChange}/>
        {alertMsgs.length > 0 && <Alert alertMsgs={alertMsgs} />}
        <button>Submit</button>
      </form>
    </div>

  );
}

export default BookingForm;