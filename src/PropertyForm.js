import userContext from './userContext';
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

function PropertyForm({ onSubmit, toggleAdding }) {
  const navigate = useNavigate();
  const { currUser } = useContext(userContext);
  const initialFormInput = {
    address: "",
    sqft: "",
    description: "",
    priceRate: ""
  }

  const [formData, setFormData] = useState(initialFormInput);
  const [alertMsgs, setAlertMsgs] = useState([]);
  const [file, setFile] = useState(null);

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData,
      [name]: value,
    }));
  }

  /** Update file update */
  function handleFile(evt) {
    setFile(evt.target.files[0]);
  }

  /** Submit form: call function from parent & clear inputs. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    const submitData = new FormData();
    submitData.append('address', formData.address);
    submitData.append('sqft', formData.sqft);
    submitData.append('description', formData.description);
    submitData.append('price_rate', formData.priceRate);
    submitData.append('file', file);
    try {
      await onSubmit(submitData);
      setFormData(initialFormInput);
      setFile(null)
      toggleAdding();
      navigate(`/users/${currUser.username}/properties`);
    } catch (err) {
      setAlertMsgs(err);
    }
  }

  return (
    <div className="PropertyForm m-2 text-start m-2">
      <form onSubmit={handleSubmit} encType="multipart/form">
        <div>
          <input
            className="form-control w-50"
            id="address"
            onChange={handleChange}
            name="address"
            value={formData.address}
            placeholder="address"
          />
        </div>

        <div>
          <input
            className="form-control w-50"
            id="sqft"
            type="sqft"
            onChange={handleChange}
            name="sqft"
            value={formData.sqft}
            placeholder="sqft"
          />
        </div>

        <div>
          <input
            className="form-control w-50"
            id="description"
            onChange={handleChange}
            name="description"
            value={formData.description}
            placeholder="description"
          />
        </div>

        <div>
          <input
            className="form-control w-50"
            id="priceRate"
            onChange={handleChange}
            name="priceRate"
            value={formData.priceRate}
            placeholder="price rate ($/day)"
          />
        </div>

        <div>
          <input
            type="file"
            className="form-control w-50"
            id="file"
            onChange={handleFile}
            name="file"
          />
        </div>
        {alertMsgs.length > 0 && <Alert alertMsgs={alertMsgs} />}
        <button className="PropertyForm-submitBtn btn btn-primary m-1">Add Property</button>
        <button className="btn btn-danger" onClick={toggleAdding}>Cancel</button>
      </form>
    </div>
  );
}

export default PropertyForm;