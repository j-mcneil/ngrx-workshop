import { Action } from '@ngrx/store';

import { Notification } from 'src/app/shared/models/notification.model';

export const ADD_NOTIFICATION = '[Notifications] Add Notification';
export const REMOVE_NOTIFICATION = '[Notifications] Remove Notification';
export const CLEAR_ALL_NOTIFICATIONS = '[Notifications] Clear All Notifications';

export class AddNotification implements Action {
  readonly type = ADD_NOTIFICATION;
  constructor(public payload: { notification: Notification }) {}
}

export class RemoveNotification implements Action {
  readonly type = REMOVE_NOTIFICATION;
  constructor(public payload: { notification: Notification }) {}
}

export class ClearAllNotifications implements Action {
  readonly type = CLEAR_ALL_NOTIFICATIONS;
  constructor() {}
}

export type NotificationsAction = AddNotification | RemoveNotification | ClearAllNotifications;
