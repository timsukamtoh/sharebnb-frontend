import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

function LoginForm({ onSubmit }) {
  const navigate = useNavigate();
  const initialFormData = {
    username: "",
    password: ""
  };

  const [formData, setFormData] = useState(initialFormData);
  const [alertMsgs, setAlertMsgs] = useState([]);

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
    submitData.append('username', formData.username);
    submitData.append('password', formData.password);
    console.log("submitData: ", submitData)
;    try {
      await onSubmit(submitData);
      setFormData(initialFormData);
      navigate("/");
    } catch (err) {
      setAlertMsgs(err);
    }
  }

  return (
    <div className="LoginForm">
      <form onSubmit={handleSubmit} className="form" encType="multipart/form">
        <div className="form-group">
          <input
            className="form-control w-25"
            id="username"
            onChange={handleChange}
            name="username"
            value={formData.username}
            placeholder="username"
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            className="form-control w-25"
            id="password"
            onChange={handleChange}
            name="password"
            value={formData.password}
            placeholder="password"
          />
        </div>
        {alertMsgs.length > 0 && <Alert alertMsgs={alertMsgs} />}
        <button className="LoginForm-submitBtn btn btn-primary m-1">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;