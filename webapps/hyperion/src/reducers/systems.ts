import { AnyAction } from "redux";

import { RECEIVE_SYSTEMS } from "../actions/universe";

function systems(state = [], action: AnyAction) {
  switch (action.type) {
    case RECEIVE_SYSTEMS:
      return state;
    default:
      return state;
  }
}

export default systems