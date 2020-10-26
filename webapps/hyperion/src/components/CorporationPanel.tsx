import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import "./CorporationPanel.css";

interface OwnProps {
  corp: any
}

interface DispatchProps {
  dispatch: Dispatch
}

type Props = OwnProps & DispatchProps

const CorporationPanel: FunctionComponent<Props> = () => {
  return <div className={"corporation-panel"}></div>;
};

const mapStateToProps = ({ currentCorp: corp }: { currentCorp: any }) => ({ corp })

export default connect(mapStateToProps)(CorporationPanel);
