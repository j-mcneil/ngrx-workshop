import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';

import { Item } from '../../models';
import { ItemsAction, LOAD_ITEMS, LOAD_ITEMS_FAIL, LOAD_ITEMS_SUCCESS } from '../actions/items.actions';

export interface ItemsState {
  loadingItems: boolean;
  loadItemsError: any;
  loadItemsSuccess: boolean;
  items: Item[];
}

export const initialState: ItemsState = {
  loadingItems: false,
  loadItemsError: null,
  loadItemsSuccess: false,
  items: [],
}

export function reducer(state: ItemsState = initialState, action: ItemsAction) : ItemsState {
  
  switch(action.type) {
    case LOAD_ITEMS: {
      return {
        ...state,
        loadingItems: true,
        loadItemsError: null,
        loadItemsSuccess: false,
      }
    }

    case LOAD_ITEMS_FAIL: {
      const error = action.error;
      return {
        ...state,
        loadingItems: false,
        loadItemsError: error,
      };
    }

    case LOAD_ITEMS_SUCCESS: {
      const { items } = action.payload;
      return {
        ...state,
        loadingItems: false,
        loadItemsSuccess: true,
        items,
      }
    }

  }

  return state;
}

export const getItems = (state: ItemsState) => state.items;
export const getItemsLoading = (state: ItemsState) => state.loadingItems;
export const getLoadItemsError = (state: ItemsState) => state.loadItemsError;
export const getLoadItemsSuccess = (state: ItemsState) => state.loadItemsSuccess;