import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "./userContext";
import Alert from "./Alert";

/** ProfileForm renders the edit profile form.
 *
 *  Props
 *  - onSubmit: func from parent, called onSubmit
 *
 * States:
 *    -alertMsgs | msgs for alert to show
 *    -formData | data for forms
 *
 *  ProfilePage -> ProfileForm
 */

function ProfileForm({ onSubmit }) {
  const { currUser } = useContext(userContext);
  const [alertMsgs, setAlertMsgs] = useState([]);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({...currUser,
                                          firstName:currUser.first_name,
                                          lastName:currUser.last_name});

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData,
      [name]: value,
    }));
  }

  /** Submit form: call function from parent & clear inputs. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    const submitData = new FormData();
    submitData.append('first_name', formData.firstName);
    submitData.append('last_name', formData.lastName);
    submitData.append('email', formData.email);
    try {
      await onSubmit(submitData);
      setFormData(currUser);
      navigate("/");
    } catch(err) {
      setAlertMsgs(err);
    }
  }
//TODO: alert for successful update
  return (
    <div className="ProfileForm p-3">
      <form onSubmit={handleSubmit} encType="multipart/form">
        <div className="form-group col-sm-5 mx-auto text-start m-2">
          <label htmlFor="username">Username</label>
          <input
            className="form-control"
            readOnly={true}
            id="username"
            name="username"
            value={formData.username}
            placeholder="username"
            disabled
          />
        </div>

        <div className="form-group col-sm-5 mx-auto text-start m-2">
          <label htmlFor="firstName">First Name</label>
          <input
            className="form-control"
            id="firstName"
            onChange={handleChange}
            name="firstName"
            value={formData.firstName}
            placeholder="first name"
          />
        </div>

        <div className="form-group col-sm-5 mx-auto text-start m-2">
          <label htmlFor="lastName">Last Name</label>
          <input
            className="form-control"
            id="lastName"
            onChange={handleChange}
            name="lastName"
            value={formData.lastName}
            placeholder="last name"
          />
        </div>

        <div className="form-group col-sm-5 mx-auto text-start m-2">
          <label htmlFor="email">Email</label>
          <input
            className="form-control"
            id="email"
            onChange={handleChange}
            name="email"
            value={formData.email}
            placeholder="email"
          />
        </div>
        {alertMsgs.length > 0 && <Alert alertMsgs={alertMsgs} />}
        <button className="ProfileForm-submitBtn btn btn-primary m-1">Save Changes</button>
      </form>
    </div>
  );
}

export default ProfileForm;