import { createSelector } from '@ngrx/store';

import { getDashboardState, DashboardState } from '../reducers';

import * as fromItems from '../reducers/items.reducer';

export const getItemsState = createSelector(
  getDashboardState,
  (state: DashboardState) => state.items  
);

export const getAllItems = createSelector(
  getItemsState,
  fromItems.getItems,
);

export const getPendingRemoveItems = createSelector(getItemsState, fromItems.getPendingRemoveItems);

export const getItems = createSelector(
  getAllItems,
  getPendingRemoveItems,
  (items, pendingRemoveItems) => items.map(item => ({
    ...item,
    isRemovalPending: !!pendingRemoveItems[item.id]
  }))
);

export const getItemsLoading = createSelector(
  getItemsState,
  fromItems.getItemsLoading
);

export const getItemsLoadError = createSelector(
  getItemsState,
  fromItems.getLoadItemsError
);

export const getItemsLoadSuccess = createSelector(
  getItemsState,
  fromItems.getLoadItemsSuccess
);

export const getItemAdding = createSelector(
  getItemsState,
  fromItems.getItemAdding
);