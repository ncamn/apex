import axios from "axios";
import React, { FunctionComponent, useState, FormEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import api from "../api";
import { authenticate } from "../redux/actions";

interface DispatchProps {
  dispatch: Dispatch
}

type Props = DispatchProps

const LoginForm: FunctionComponent<Props> = ({ dispatch }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: FormEvent) => {
    // Prevent event default behavior
    e.preventDefault();

    // Call API endpoint to authenticate user
    axios
      .post(`${api.url}/user/authenticate`, {
        email,
        password
      })
      .then(res => {
        e
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
          <input
            onChange={e => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            onChange={e => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default connect()(LoginForm);
