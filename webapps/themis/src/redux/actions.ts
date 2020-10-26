import api from "../api";
import axios from "axios";

/*
General
 */

export const AUTHENTICATE = "AUTHENTICATE";

export function authenticate(token: string) {
  return {
    type: AUTHENTICATE,
    token
  };
}

export const LOGOUT = "LOGOUT";

export function logout() {
  return {
    type: LOGOUT
  };
}

export const NOTIFY = "NOTIFY";

export function notify(message: string) {
  return {
    type: NOTIFY,
    message
  };
}

export const POP_NOTIFICATION = "POP_NOTIFICATION";

export function popNotification() {
  return {
    type: POP_NOTIFICATION
  };
}

/*
Fetching
 */

export function requestApi(actionType) {
  return {
    type: actionType,
    data: []
  };
}

export function receiveApi(actionType, data) {
  return {
    type: actionType,
    data
  };
}

export const FETCH_CRYPTO_LIST = "FETCH_CRYPTO_LIST";

export function fetchCryptoList() {
  return dispatch => {
    dispatch(requestApi(FETCH_CRYPTO_LIST));
    axios
      .get(`${api.url}/exchanges/global/cryptos`)
      .then(res => {
        dispatch(receiveApi(FETCH_CRYPTO_LIST, res.data));
      })
      .catch(error => {
        console.error(error);
      });
  };
}

export const FETCH_EXCHANGE_LIST = "FETCH_EXCHANGE_LIST";

export function fetchExchangeList() {
  return dispatch => {
    dispatch(requestApi(FETCH_EXCHANGE_LIST));
    axios
      .get(`${api.url}/exchanges`)
      .then(res => {
        dispatch(receiveApi(FETCH_EXCHANGE_LIST, res.data));
      })
      .catch(error => {
        console.error(error);
      });
  };
}

export const FETCH_FIAT_LIST = "FETCH_FIAT_LIST";

export function fetchFiatList() {
  return dispatch => {
    dispatch(requestApi(FETCH_FIAT_LIST));
    axios
      .get(`${api.url}/exchanges/global/fiats`)
      .then(res => {
        dispatch(receiveApi(FETCH_FIAT_LIST, res.data));
      })
      .catch(error => {
        console.error(error);
      });
  };
}

/*
export const FETCH_PAIR_OHLC = 'FETCH_PAIR_OHLC';

export function fetchPairOHLC() {
    return {
        type: FETCH_PAIR_OHLC,
    }
}

export const FETCH_PAIR_ORDER_BOOK = 'FETCH_PAIR_ORDER_BOOK';

export function fetchPairOrderBook() {
    return {
        type: FETCH_PAIR_ORDER_BOOK,
    }
}
*/
