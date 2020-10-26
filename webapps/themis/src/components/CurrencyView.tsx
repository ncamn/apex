import React, { FunctionComponent } from "react";
import { RouteComponentProps } from "react-router";

type Props = RouteComponentProps<{ currency: string }>

const CurrencyView: FunctionComponent<Props> = ({ match: { params: { currency } } }) => {
  return (
    <div className="container">
      <div className="page-header">
        <h2>{currency}</h2>
      </div>
      <h4>Related pairs</h4>
      <p>#TODO</p>
    </div>
  );
}

export default CurrencyView;
