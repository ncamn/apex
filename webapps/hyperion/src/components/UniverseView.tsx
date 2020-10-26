import React, { FunctionComponent, useEffect } from "react";
import { connect } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

// Redux
import { fetchRegions } from "../actions/regions";

import VisibleLocationSelector from "../containers/VisibleLocationSelector";

// Styling
import "./UniverseView.css";

interface OwnProps {
  selection: any
}

interface DispatchProps {
  dispatch: ThunkDispatch<{}, {}, AnyAction>
}

type Props = OwnProps & DispatchProps

const UniverseView: FunctionComponent<Props> = ({ dispatch, selection }) => {
  useEffect(() => {
    if (!selection)
      dispatch(fetchRegions());
  })

  return (
    <div id={"universe-view"} className={"container-fluid"}>
      <div className={"container"}>
        <VisibleLocationSelector />
      </div>
      {selection.region && (
        <div className={"container"}>
          <h4>Region - {selection.region.name}</h4>
          <p className={"description"}>
            {selection.region.description}
          </p>
        </div>
      )}
      {selection.constellation && (
        <div className={"container"}>
          <h4>Constellation - {selection.constellation.name}</h4>
        </div>
      )}
      {selection.system && (
        <div className={"container"}>
          <h4>System - {selection.system.name}</h4>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = ({ locationSelection: selection }: any) => ({ selection })

export default connect(mapStateToProps)(UniverseView);
