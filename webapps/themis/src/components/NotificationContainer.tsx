import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { popNotification } from "../redux/actions";

import styles from "./NotificationContainer.module.css"

interface StateProps {
  notifications: string[],
}

interface DispatchProps {
  popNotification: () => void
}

type Props = StateProps & DispatchProps;

const mapStateToProps = (state: any) => {
  return {
    notifications: state.notifications
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    popNotification: () => {
      dispatch(popNotification());
    }
  };
};

const NotificationContainer: FunctionComponent<Props> = ({ notifications, popNotification }) => {
  return (
    <div className={styles.notificationContainer}>
      {notifications.map((notification, index) => {
        return (
          <div
            className={styles.notification}
            key={index}
            onClick={() => {
              popNotification();
            }}
          >
            <span>{notification}</span>
            <span className="close" aria-label="Close">
              <span>&times;</span>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationContainer);
