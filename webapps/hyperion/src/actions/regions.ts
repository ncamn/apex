import esi from "../esi";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

export const RECEIVE_REGIONS_NAMES = "RECEIVE_REGIONS_NAMES";

function receiveRegionsNames(regions: any[]) {
  return {
    type: RECEIVE_REGIONS_NAMES,
    regions: regions
  };
}

function fetchRegionsNames(regionsIds: number[]) {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const response = await fetch(`${esi.url}/universe/names/?${esi.datasource}`, {
      method: "POST",
      body: JSON.stringify(regionsIds)
    });
    const json = await response.json();
    return dispatch(receiveRegionsNames(json));
  };
}

export const RECEIVE_REGIONS = "RECEIVE_REGIONS";

function receiveRegions(regionsIds: number[]) {
  return {
    type: RECEIVE_REGIONS,
    regionsIds: regionsIds
  };
}

export function fetchRegions() {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const response = await fetch(`${esi.url}/universe/regions/?${esi.datasource}`);
    const json = await response.json();
    dispatch(fetchRegionsNames(json));
    dispatch(receiveRegions(json));
  };
}
