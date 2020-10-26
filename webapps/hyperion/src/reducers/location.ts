import { AnyAction } from "redux";

import {
  SELECT_REGION,
  SELECT_CONSTELLATION,
  SELECT_SYSTEM
} from "../actions/locationSelection";

export function locationSelection(state = {}, action: AnyAction) {
  switch (action.type) {
    case SELECT_REGION:
      return { ...state, region: action.region };
    case SELECT_CONSTELLATION:
      return { ...state, constellation: action.constellation };
    case SELECT_SYSTEM:
      return { ...state, system: action.system };
    default:
      return state;
  }
}

export function locationSelector(state = { level: "region" }, action: AnyAction) {
  switch (action.type) {
    case SELECT_REGION:
      return { ...state, level: "constellation" };
    case SELECT_CONSTELLATION:
      return { ...state, level: "system" };
    default:
      return state;
  }
}
