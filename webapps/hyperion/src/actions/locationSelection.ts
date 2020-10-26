import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import esi from "../esi";

/*
Region Selection
 */
export const SELECT_REGION = "SELECT_REGION";

function selectRegion(region: any) {
  return {
    type: SELECT_REGION,
    region: region
  };
}

function fetchConstellationsNames(region: any) {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const response = await fetch(`${esi.url}/universe/names/?${esi.datasource}`, {
      method: "POST",
      body: JSON.stringify(region.constellations)
    });
    const constellations = await response.json();
    region.constellations = constellations;
    dispatch(selectRegion(region));
  };
}

export function fetchRegionInfo(regionId: number) {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const response = await fetch(`${esi.url}/universe/regions/${regionId}/?${esi.datasource}`);
    const region = await response.json();
    return dispatch(fetchConstellationsNames(region));
  };
}

/*
Constellation Selection
 */
export const SELECT_CONSTELLATION = "SELECT_CONSTELLATION";

function selectConstellation(constellation: any) {
  return {
    type: SELECT_CONSTELLATION,
    constellation: constellation
  };
}

function fetchSystemsNames(constellation: any) {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const response = await fetch(`${esi.url}/universe/names/?${esi.datasource}`, {
      method: "POST",
      body: JSON.stringify(constellation.systems)
    });
    const systems = await response.json();
    constellation.systems = systems;
    dispatch(selectConstellation(constellation));
  };
}

export function fetchConstellationInfo(constellationId: number) {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const response = await fetch(`${esi.url}/universe/constellations/${constellationId}/?${esi.datasource}`);
    const constellation = await response.json();
    return dispatch(fetchSystemsNames(constellation));
  };
}

/*
System Selection
 */
export const SELECT_SYSTEM = "SELECT_SYSTEM";

function selectSystem(system: any) {
  return {
    type: SELECT_SYSTEM,
    system: system
  };
}

export function fetchSystemInfo(systemId: number) {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const response = await fetch(`${esi.url}/universe/systems/${systemId}/?${esi.datasource}`);
    const system = await response.json();
    return dispatch(selectSystem(system));
  };
}

export function selectLocation(locationId: number) {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: Function) => {
    switch (getState().locationSelector.level) {
      case "region":
        dispatch(fetchRegionInfo(locationId));
        break;
      case "constellation":
        dispatch(fetchConstellationInfo(locationId));
        break;
      case "system":
        dispatch(fetchSystemInfo(locationId));
        break;
      default:
    }
  };
}
