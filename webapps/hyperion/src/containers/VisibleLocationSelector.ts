import { connect } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

// Redux
import { selectLocation } from "../actions/locationSelection";

import LocationSelector from "../components/LocationSelector";

const mapStateToProps = ({ locationSelection, locationSelector, regions }: any) => {
  switch (locationSelector.level) {
    case "region":
      return { list: regions };
    case "constellation":
      if (locationSelection.region.constellations)
        return { list: locationSelection.region.constellations };
      return { list: regions };
    case "system":
      if (locationSelection.constellation.systems)
        return { list: locationSelection.constellation.systems };
      return { list: regions };
    default:
      return { list: regions };
  }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  return {
    handleSelection: (id: number) => dispatch(selectLocation(id))
  };
};

const VisibleSideSelector = connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationSelector);

export default VisibleSideSelector;
