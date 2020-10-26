import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import esi from "../esi";

/*
export const RECEIVE_NPC_CORP_DATA = 'RECEIVE_NPC_CORP_DATA';

function receiveCorpData(corpId, data) {
  return {
    type: RECEIVE_NPC_CORP_DATA,
    corpId: corpId,
    data: data
  }
}

function fetchCorpIcons(corp) {
  return dispatch => {
    return fetch(`${esi.url}/corporations/${corp.id}/icons/?${esi.datasource}`)
      .then(response => response.json())
      .then(json => dispatch(receiveCorpData(corp.id, json)))
  }
}


function fetchCorpInfo(corp) {
  return dispatch => {
    return fetch(`${esi.url}/corporations/${corp.id}/?${esi.datasource}`)
      .then(response => response.json())
      .then(json => dispatch(receiveCorpData(corp.id, json)))
  }
}
*/

export const RECEIVE_NPC_CORP_NAMES = "RECEIVE_NPC_CORP_NAMES";

function receiveCorpNames(corps: any[]) {
  return {
    type: RECEIVE_NPC_CORP_NAMES,
    corps: corps
  };
}

function fetchCorpNames(corps: any[]) {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const response = await fetch(`${esi.url}/corporations/names/?${esi.datasource}&corporation_ids=${corps.join()}`);
    const json = await response.json();

    return dispatch(receiveCorpNames(json));
  };
}

export const RECEIVE_NPC_CORPS = "RECEIVE_NPC_CORPS";

function receiveNpcCorps(corpsIds: number[]) {
  return {
    type: RECEIVE_NPC_CORPS,
    corpsIds: corpsIds
  };
}

export function fetchNpcCorps() {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const response = await fetch(`${esi.url}/corporations/npccorps/?${esi.datasource}`);
    const json = await response.json();
    for (let i = 0; i * 100 < json.length; i++) {
      dispatch(fetchCorpNames(json.splice(i * 100, (i + 1) * 100)));
    }
    dispatch(receiveNpcCorps(json));
  };
}
