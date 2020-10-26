import { AnyAction } from "redux";

import { RECEIVE_CONSTELLATIONS} from "../actions/universe";

function constellations(state = [], action: AnyAction) {
  switch (action.type) {
    case RECEIVE_CONSTELLATIONS:
      return state;
    default:
      return state;
  }
}

export default constellations