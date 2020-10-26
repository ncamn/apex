import React, { FunctionComponent, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

import {
  fetchCryptoList,
  fetchExchangeList,
  fetchFiatList
} from "../redux/actions";

import NavDropDown from "../components/NavDropDown";
import Spinner from "../components/Spinner";

interface StateProps {
  cryptoList: any[],
  exchangeList: {
    displayName: string,
    name: string,
  }[],
  fiatList: any[],
}

interface DispatchProps {
  dispatch: ThunkDispatch<{}, {}, AnyAction>
}

type Props = StateProps & DispatchProps;

const NavBar: FunctionComponent<Props> = ({ cryptoList, dispatch, exchangeList, fiatList }) => {
  useEffect(() => {
    if (!cryptoList)
      dispatch(fetchCryptoList());

    if (!exchangeList)
      dispatch(fetchExchangeList());

    if (!fiatList)
      dispatch(fetchFiatList());
  })

  return (
    <nav className="navbar navbar-fixed-top">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link to="/" className="navbar-brand">
            Apex
            </Link>
        </div>
        <ul className="nav navbar-nav">
          {fiatList.length ? (
            <NavDropDown name="Fiats">
              {fiatList.map(currency => {
                return (
                  <Link to={"/global/" + currency.name} key={currency.name}>
                    <li>{currency.displayName || currency.name}</li>
                  </Link>
                );
              })}
            </NavDropDown>
          ) : (
              <li className="navbar-spinner">
                <Spinner />
              </li>
            )}
          {cryptoList.length ? (
            <NavDropDown name="Cryptos">
              {cryptoList.map(currency => {
                return (
                  <Link to={"/global/" + currency.name} key={currency.name}>
                    <li>{currency.displayName || currency.name}</li>
                  </Link>
                );
              })}
            </NavDropDown>
          ) : (
              <li className="navbar-spinner">
                <Spinner />
              </li>
            )}
          {exchangeList.length ? (
            <NavDropDown name="Exchanges">
              {exchangeList.map(exchange => {
                return (
                  <Link to={"/" + exchange.name} key={exchange.name}>
                    <li>{exchange.displayName || exchange.name}</li>
                  </Link>
                );
              })}
            </NavDropDown>
          ) : (
              <li className="navbar-spinner">
                <Spinner />
              </li>
            )}
          <NavDropDown name="Analysis">
            <Link to="/correlation">
              <li>Correlation</li>
            </Link>
          </NavDropDown>
        </ul>
        <ul id="login-links" className="nav navbar-nav navbar-right">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default connect()(NavBar);
