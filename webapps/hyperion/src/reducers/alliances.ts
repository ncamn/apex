import { AnyAction } from "redux";

import { RECEIVE_ALLIANCE_LIST } from "../actions/alliances";

function alliances(state = [], action: AnyAction) {
  switch (action.type) {
    /*
        case RECEIVE_ALLIANCE_DATA:
          return Array.from(state, alliance => {
            if (action.allianceId === alliance.id)
              return Object.assign({}, alliance, action.data);
            return alliance
          });
          */
    case RECEIVE_ALLIANCE_LIST:
      return action.allianceList;
    default:
      return state;
  }
}

export default alliances