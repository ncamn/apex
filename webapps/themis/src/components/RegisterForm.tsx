import axios from "axios";
import React, { useState, FunctionComponent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import api from "../api";
import { authenticate } from "../redux/actions";

interface DispatchProps {
  dispatch: Dispatch
}

type Props = DispatchProps

const RegisterForm: FunctionComponent<Props> = ({ dispatch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    // Prevent event default behavior
    e.preventDefault();

    // Call API endpoint to register user
    axios
      .post(`${api.url}/user/register`, {
        email,
        password
      })
      .then(res => {
        // Dispatch auth token to redux store
        dispatch(authenticate(res.data));
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="full-page">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Enter your email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            onChange={(e => setEmail(e.target.value))}
            value={email}
          />
        </div>
        <div>
          <label htmlFor="password">Enter your password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            onChange={(e => setPassword(e.target.value))}
            value={password}
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default connect()(RegisterForm);
