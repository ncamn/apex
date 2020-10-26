import { AnyAction } from "redux";

import { RECEIVE_NPC_CORP_NAMES, RECEIVE_NPC_CORPS } from "../actions/npcCorps";

function npcCorps(state: any[] = [], action: AnyAction) {
  switch (action.type) {
    /*
        case RECEIVE_NPC_CORP_DATA:
          return Array.from(state, corp => {
            if (action.corpId === corp.id)
              return Object.assign({}, corp, action.data);
            return corp
          });
          */
    case RECEIVE_NPC_CORP_NAMES:
      return Array.from(state, (corp: any) => {
        let newCorp = action.corps.find((fetchedCorp: any) => {
          return corp.corporation_id === fetchedCorp.corporation_id;
        });

        return newCorp === undefined ? corp : newCorp;
      });
    case RECEIVE_NPC_CORPS:
      return Array.from(action.corpsIds, corpId => {
        return { corporation_id: corpId };
      });
    default:
      return state;
  }
}

export default npcCorps