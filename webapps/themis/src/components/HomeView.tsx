import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { notify } from "../redux/actions";
import Spinner from "../components/Spinner";

interface DispatchProps {
  dispatch: Dispatch
}

type Props = DispatchProps

const HomeView: FunctionComponent<Props> = ({ dispatch }) => {
  return (
    <div className="container">
      <div className="page-header">
        <h2>Apex Dashboard</h2>
        <p>An Halfake production</p>
      </div>
      <div>
        <p>#TODO</p>
        <button
          onClick={() => {
            dispatch(notify(Date.now().toString()));
          }}
        >
          Notify
        </button>
        <Spinner />
      </div>
    </div>
  );
};

export default connect()(HomeView);
