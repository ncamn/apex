import { Dispatch } from "redux";

import esi from "../esi";

/*
export const RECEIVE_ALLIANCE_DATA = 'RECEIVE_ALLIANCE_DATA';

function receiveAllianceData(allianceId, data) {
  return {
    type: RECEIVE_ALLIANCE_DATA,
    allianceId: allianceId,
    data: data
  }
}

function fetchAllianceCorporations(allianceId) {
  return dispatch => {
    return fetch(`${esi.url}/alliances/${allianceId}/corporations/?${esi.datasource}`)
      .then(response => response.json())
      .then(json => dispatch(receiveAllianceData(allianceId, {corporations: json})))
  }
}

function fetchAllianceIcons(allianceId) {
  return dispatch => {
    return fetch(`${esi.url}/alliances/${allianceId}/icons/?${esi.datasource}`)
      .then(response => response.json())
      .then(json => dispatch(receiveAllianceData(allianceId, json)))
  }
}

function fetchAllianceInfo(allianceId) {
  return dispatch => {
    return fetch(`${esi.url}/alliances/${allianceId}/?${esi.datasource}`)
      .then(response => response.json())
      .then(json => dispatch(receiveAllianceData(allianceId, json)))
  }
}
*/

export const RECEIVE_ALLIANCE_LIST = "RECEIVE_ALLIANCE_LIST";

function receiveAllianceList(allianceList: any[]) {
  return {
    type: RECEIVE_ALLIANCE_LIST,
    allianceList: allianceList
  };
}

export function fetchAllianceList() {
  return async (dispatch: Dispatch) => {
    const response = await fetch(`${esi.url}/alliances/?${esi.datasource}`);
    const json = await response.json();

    let allianceList: any[] = [];
    json.map((allianceId: number) => {
      allianceList.push({ corporation_id: allianceId });
      return allianceId;
    });

    //dispatch(fetchAllianceCorporations(allianceList[0].id));
    //dispatch(fetchAllianceInfo(allianceList[0].id));
    //dispatch(fetchAllianceIcons(allianceList[0].id));
    dispatch(receiveAllianceList(allianceList));
  };
}
