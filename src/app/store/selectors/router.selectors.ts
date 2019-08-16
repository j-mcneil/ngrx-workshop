import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRouterStore from '@ngrx/router-store';

import * as fromRouter from '../reducers/router.reducer';

export const getRouterState = createFeatureSelector<fromRouterStore.RouterReducerState<fromRouter.RouterStateUrl>>(
  'routerReducer'
);


const {
  selectQueryParams,    // select the current route query params
  selectRouteParams,    // select the current route params
  selectRouteData,      // select the current route data
  selectUrl,            // select the current url
} = fromRouterStore.getSelectors(getRouterState);


export const getTheme = createSelector(
  selectQueryParams,
  queryParams => queryParams && queryParams.theme
)