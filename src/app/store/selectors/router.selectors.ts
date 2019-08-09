import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRouterStore from '@ngrx/router-store';

import * as fromRouter from '../reducers/router.reducer';

export const getRouterState = createFeatureSelector<fromRouterStore.RouterReducerState<fromRouter.RouterStateUrl>>(
  'routerReducer'
);

export const getTheme = createSelector(
  getRouterState,
  router => {
    return router && router.state && router.state.queryParams && router.state.queryParams.theme;
  }
)