import { AnyAction } from "redux";

import { RECEIVE_REGIONS, RECEIVE_REGIONS_NAMES } from "../actions/regions";

function regions(state: any[] = [], action: AnyAction) {
  switch (action.type) {
    case RECEIVE_REGIONS_NAMES:
      return Array.from(state, (region: any) => {
        let fetchedRegion = action.regions.find((fetchedRegion: any) => {
          return region.id === fetchedRegion.id;
        });

        return { ...region, name: fetchedRegion.name };
      });
    case RECEIVE_REGIONS:
      return Array.from(action.regionsIds, regionId => {
        return { id: regionId };
      });
    default:
      return state;
  }
}

export default regions