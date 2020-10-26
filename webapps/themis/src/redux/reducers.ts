import { combineReducers } from "redux";
import {
  AUTHENTICATE,
  FETCH_CRYPTO_LIST,
  FETCH_EXCHANGE_LIST,
  FETCH_FIAT_LIST,
  LOGOUT,
  NOTIFY,
  POP_NOTIFICATION
} from "./actions";

function authToken(state = null, action) {
  switch (action.type) {
    case AUTHENTICATE:
      return action.token;
    case LOGOUT:
      return null;
    default:
      return state;
  }
}

function cryptoList(state = [], action) {
  switch (action.type) {
    case FETCH_CRYPTO_LIST:
      return action.data;
    default:
      return state;
  }
}

function exchangeList(state = [], action) {
  switch (action.type) {
    case FETCH_EXCHANGE_LIST:
      return action.data;
    default:
      return state;
  }
}

function fiatList(state = [], action) {
  switch (action.type) {
    case FETCH_FIAT_LIST:
      return action.data;
    default:
      return state;
  }
}

function notifications(state = [], action) {
  let copy;

  switch (action.type) {
    case NOTIFY:
      copy = state.slice();
      copy.push(action.message);

      return copy;
    case POP_NOTIFICATION:
      copy = state.slice();
      copy.pop();

      return copy;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  authToken,
  cryptoList,
  exchangeList,
  fiatList,
  notifications
});

export default rootReducer;
