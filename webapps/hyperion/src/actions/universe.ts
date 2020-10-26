import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import esi from "../esi";

export const RECEIVE_CONSTELLATIONS = "RECEIVE_CONSTELLATIONS";

function receiveConstellations(constellations: any[]) {
  return {
    type: RECEIVE_CONSTELLATIONS,
    constellations: constellations
  };
}

export function fetchConstellations() {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const response = await fetch(`${esi.url}/universe/constellations/?${esi.datasource}`);
    const json = await response.json();
    return dispatch(receiveConstellations(json));
  };
}

export const RECEIVE_SYSTEMS = "RECEIVE_SYSTEMS";

function receiveSystems(systems: any[]) {
  return {
    type: RECEIVE_SYSTEMS,
    systems: systems
  };
}

export function fetchSystems() {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const response = await fetch(`${esi.url}/universe/systems/?${esi.datasource}`);
    const json = await response.json();
    return dispatch(receiveSystems(json));
  };
}
