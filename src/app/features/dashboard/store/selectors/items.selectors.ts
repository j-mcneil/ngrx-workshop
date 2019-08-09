import { createSelector } from '@ngrx/store';

import { getDashboardState, DashboardState } from '../reducers';

import * as fromItems from '../reducers/items.reducer';
import * as asyncActionState from 'src/app/shared/store/async-action-state';


export const getItemsState = createSelector(
  getDashboardState,
  (state: DashboardState) => state.items  
);

export const {
  selectIds: getItemIds,
  selectEntities: getItemEntities,
  selectAll: getAllItems,
  selectTotal: getItemsTotal,
} = fromItems.itemAdapter.getSelectors(getItemsState);

export const getPendingRemoveItems = createSelector(getItemsState, fromItems.getPendingRemoveItems);

export const getItems = createSelector(
  getAllItems,
  getPendingRemoveItems,
  (items, pendingRemoveItems) => items.map(item => ({
    ...item,
    isRemovalPending: !!pendingRemoveItems[item.id]
  }))
);

export const {
  getInProgress: getItemsLoading,
  getError: getItemsLoadError,
  getSuccess: getItemsLoadSuccess,
  getNeedsFiring: getItemsNeedLoading
} = asyncActionState.getSelectors(getItemsState, (state: fromItems.ItemsState) => state.loadItems);

export const {
  getInProgress: getItemAdding
} = asyncActionState.getSelectors(getItemsState, (state: fromItems.ItemsState) => state.addItem);