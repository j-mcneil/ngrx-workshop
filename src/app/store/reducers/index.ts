import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from 'src/environments/environment';
import * as fromNotifications from './notifications.reducer';

export interface State {
  notifications: fromNotifications.NotificationsState,
};

export const reducers: ActionReducerMap<State> = {
  notifications: fromNotifications.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [ storeFreeze ] : [];

export { NotificationsState } from './notifications.reducer';