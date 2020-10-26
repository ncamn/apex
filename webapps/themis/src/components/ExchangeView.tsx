import axios from "axios";
import React, { FunctionComponent, useState, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";

import api from "../api";

import styles from "../css/ExchangeView.module.css";

interface Currency {
  name: string
}

interface Exchange {
  displayName: string
  name: string
}

interface Pair {
  base: string
  name: string
  quote: string
}

type Props = RouteComponentProps<{ exchange: string }>

const ExchangeView: FunctionComponent<Props> = ({ match }) => {
  const [currencies, setCurrencies] = useState<Currency[]>([])
  const [error, setError] = useState("")
  const [exchange, setExchange] = useState<Exchange>()
  const [pairs, setPairs] = useState<Pair[]>([])


  const fetchData = (exchange: string) => {
    // Fetch exchange currencies' infos
    axios
      .get(`${api.url}/exchanges/${exchange}/assets`)
      .then(res => setCurrencies(res.data))
      .catch(err => setError(err));

    // Fetch exchange infos
    axios
      .get(`${api.url}/exchanges/${exchange}`)
      .then(res => setExchange(res.data))
      .catch(err => setError(err));

    // Fetch exchange traded pairs
    axios
      .get(`${api.url}/exchanges/${exchange}/pairs`)
      .then(res => setPairs(res.data))
      .catch(err => setError(err));
  }

  useEffect(() => {
    if (!currencies.length || !exchange || !pairs.length) {
      fetchData(match.params.exchange)
    }
  })

  if (error) return <p>Error</p>

  if (!exchange) return <p>Loading</p>

  return (
    <div id="exchange-view" className="container">
      <div className="section-header">
        <h2>{exchange.displayName}</h2>
        <h4>Traded currencies</h4>
      </div>
      <div className="currencies-tiles">
        {currencies.map(currency => {
          return (
            <div className="panel panel-default" key={currency.name}>
              <div className="panel-heading">
                <h5>
                  <Link to={`${exchange.name}/${currency.name}`}>
                    {currency.name}
                  </Link>
                </h5>
              </div>
              <div className="panel-body">
                {pairs
                  .filter(pair => {
                    return (
                      pair.base === currency.name ||
                      pair.quote === currency.name
                    );
                  })
                  .map(pair => {
                    return (
                      <p className="pair" key={pair.name}>
                        <Link
                          to={`${exchange.name}/${pair.base}/${pair.quote}`}
                        >
                          {pair.base}/{pair.quote}
                        </Link>
                      </p>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="section-header">
        <h4>Data fetch triggers</h4>
      </div>
      <div className="triggers-tiles">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h5>Assets list</h5>
          </div>
          <div className="panel-body">
            <p>No arguments</p>
            <button>Run</button>
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h5>Pairs list</h5>
          </div>
          <div className="panel-body">
            <p>No arguments</p>
            <button>Run</button>
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h5>OHLC</h5>
          </div>
          <div className="panel-body">
            <input type="text" placeholder="Base" />
            <input type="text" placeholder="Quote" />
            <button>Run</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExchangeView;
