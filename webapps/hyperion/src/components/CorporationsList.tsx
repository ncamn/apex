import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

// Redux
import { fetchAllianceList } from "../actions/alliances";
import { fetchNpcCorps } from "../actions/npcCorps";

import "./CorporationsList.css";

interface OwnProps {
  alliances: any[]
  npcCorps: any[]
}

interface DispatchProps {
  dispatch: ThunkDispatch<{}, {}, AnyAction>
}

type Props = OwnProps & DispatchProps

const CorporationList: FunctionComponent<Props> = ({ alliances, dispatch, npcCorps }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Safeguard
    if (!loading) {
      setLoading(true)
    } else {
      return
    }

    if (!npcCorps.length) {
      dispatch(fetchNpcCorps());
    }

    if (!alliances.length) {
      dispatch(fetchAllianceList());
    }
  })

  return (
    <ul className={"corp-list"}>
      {npcCorps.map(corp => {
        return (
          <li className={"corp-list-item"} key={corp.corporation_id}>
            <a href="/">
              {/* <img alt={"Logo"} src={corp.px64x64}/> */}
              <span>{corp.corporation_name}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

const mapStateToProps = ({ alliances, npcCorps }: any) => ({
  alliances: alliances,
  npcCorps: npcCorps
})

export default connect(mapStateToProps)(CorporationList);
