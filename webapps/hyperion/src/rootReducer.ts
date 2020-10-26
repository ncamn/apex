import { combineReducers } from "redux";

import alliances from "./reducers/alliances"
import npcCorps from "./reducers/npcCorps"
import constellations from "./reducers/constellations"
import regions from "./reducers/regions"
import systems from "./reducers/systems"
import { locationSelection, locationSelector } from "./reducers/location"

const rootReducer = combineReducers({
  alliances,
  npcCorps,
  constellations,
  regions,
  systems,
  locationSelection,
  locationSelector
});

export default rootReducer;
