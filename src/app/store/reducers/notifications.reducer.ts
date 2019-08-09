import * as fromNotifications from '../actions/notifications.actions';
import { Notification } from 'src/app/shared/models';


export interface NotificationsState {
  notifications: Notification[];
}

export const initialState: NotificationsState = {
  notifications: [],
};

export function reducer(state: NotificationsState = initialState, action: fromNotifications.NotificationsAction): NotificationsState {
  switch (action.type) {
    case fromNotifications.ADD_NOTIFICATION: {
      const { notification } = action.payload;
      return {
        ...state,
        notifications: [...state.notifications, notification],
      };
    }

    case fromNotifications.REMOVE_NOTIFICATION: {
      const { notification } = action.payload;
      return {
        ...state,
        notifications: state.notifications.filter(n => n !== notification),
      };
    }

    case fromNotifications.CLEAR_ALL_NOTIFICATIONS: {
      return {
        ...state,
        notifications: [],
      };
    }

    default:
      return state;
  }
}

export const getNotifications = (state: NotificationsState) => state.notifications;
