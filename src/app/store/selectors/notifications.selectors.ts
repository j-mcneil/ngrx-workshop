import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromNotifications from '../reducers/notifications.reducer';

export const getNotificationsState = createFeatureSelector<fromNotifications.NotificationsState>('notifications');

export const getNotifications = createSelector(
  getNotificationsState,
  fromNotifications.getNotifications
);
