import React, { FunctionComponent } from "react";

import "../css/OrderBook.css";

interface Props {
  asks: any[]
  bids: any[]
}

const OrderBook: FunctionComponent<Props> = ({ asks, bids }) => (
  <div className="order-book">
    <div>
      <table>
        <tbody>
          {asks
            ? asks.map(row => {
              return (
                <tr className="ask" key={row[0]}>
                  <td>{row[0]}</td>
                  <td>{row[1]}</td>
                </tr>
              );
            })
            : null}
          {bids
            ? bids.map(row => {
              return (
                <tr className="bid" key={row[0]}>
                  <td>{row[0]}</td>
                  <td>{row[1]}</td>
                </tr>
              );
            })
            : null}
        </tbody>
      </table>
    </div>
  </div>
);

export default OrderBook;
