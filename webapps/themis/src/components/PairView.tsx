import axios from "axios";
import React, { useState, useEffect, FunctionComponent } from "react";
import { RouteComponentProps } from "react-router";

import api from "../api";
import Chart from "../components/Chart";
//import OrderBook from "./OrderBook";

import "../css/PairView.css";

type Props = RouteComponentProps<{ base: string, exchange: string, quote: string }>

const PairView: FunctionComponent<Props> = ({ match: { params: { base, exchange, quote } } }) => {
  const [open, setOpen] = useState([])
  const [ohlc, setOHLC] = useState([])
  const [volume, setVolume] = useState([])
  const [asks, setAsks] = useState([])
  const [bids, setBids] = useState([])
  const [chartType, setChartType] = useState("line")

  const fetchOHLC = () => {
    axios
      .get(
        `${api.url}/exchanges/${exchange}/${base}/${quote}/ohlc`
      )
      .then(res => res.data.data.reverse().slice(-100))
      .then(data => {
        setOpen(data
          .map((item: any) => parseFloat(item.open)))

        setOHLC(data
          .map((item: any) => ({
            open: parseFloat(item.open),
            high: parseFloat(item.high),
            low: parseFloat(item.low),
            close: parseFloat(item.close),
          })
          ))

        setVolume(data
          .map((item: any) => parseFloat(item.volume)))
      })
      .catch(error => {
        console.error(error);
      });
  }

  const fetchOrderBook = () => {
    axios
      .get(
        `${api.url}/exchanges/${exchange}/${base}/${quote}/depth`
      )
      .then(res => {
        setAsks(res.data.asks.reverse().slice(-22))
        setBids(res.data.bids.slice(0, 22))
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(() => {
    if (!ohlc.length)
      fetchOHLC()

    if (!asks.length && !bids.length)
      fetchOrderBook()
  })

  let chartData: any[] = [];

  switch (chartType) {
    case "line":
      chartData = open;
      break;
    case "candlestick":
      chartData = ohlc;
      break;
    case "ohlc":
      chartData = ohlc;
      break;
    default:
      break;
  }

  return (
    <div id="pair-view" className="container-fluid">
      <div className="flex-row">
        <h4>
          {base + "/" + quote}
        </h4>
        <select value={chartType} onChange={e => setChartType(e.target.value)}>
          <option value="line">Line</option>
          <option value="candlestick">Candlestick</option>
          <option value="ohlc">OHLC</option>
        </select>
      </div>
      <div className="dashboard">
        <div className="flex-column">
          <Chart
            height={400}
            width={1200}
            data={chartData}
            type={chartType}
          />
          <Chart
            height={100}
            width={1200}
            data={volume}
            type="bar"
          />
        </div>
        {/*
          <OrderBook asks={this.state.asks} bids={this.state.bids}/>
        */}
      </div>
    </div>
  );
}

export default PairView;
