import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromRouterStore from '@ngrx/router-store';

import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from 'src/environments/environment';
import * as fromRouter from './router.reducer';
import * as fromNotifications from './notifications.reducer';

export interface State {
  notifications: fromNotifications.NotificationsState,
  routerReducer: fromRouterStore.RouterReducerState<fromRouter.RouterStateUrl>;
};

export const reducers: ActionReducerMap<State> = {
  notifications: fromNotifications.reducer,
  routerReducer: fromRouter.reducer,
};

export const metaReducers: MetaReducer<State>[] = [];

export { NotificationsState } from './notifications.reducer';
export { CustomSerializer } from './router.reducer';
