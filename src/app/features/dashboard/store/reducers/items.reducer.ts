import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';

import { Item } from '../../models';
import { ItemsAction, LOAD_ITEMS, LOAD_ITEMS_FAIL, LOAD_ITEMS_SUCCESS, ADD_ITEM, ADD_ITEM_FAIL, ADD_ITEM_SUCCESS } from '../actions/items.actions';

export interface ItemsState {
  loadingItems: boolean;
  loadItemsError: any;
  loadItemsSuccess: boolean;
  items: Item[];

  itemAdding: boolean;
  addItemError: any;
  addItemSuccess: boolean;
}

export const initialState: ItemsState = {
  loadingItems: false,
  loadItemsError: null,
  loadItemsSuccess: false,
  items: [],

  itemAdding: false,
  addItemError: null,
  addItemSuccess: false,
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

    case ADD_ITEM: {
      return {
        ...state,
        itemAdding: true,
        addItemError: null,
        addItemSuccess: false,
      };
    }

    case ADD_ITEM_FAIL: {
      const error = action.error;
      return {
        ...state,
        itemAdding: false,
        addItemError: error,
      };
    }

    case ADD_ITEM_SUCCESS: {
      const { item } = action.payload;
      return {
        ...state,
        itemAdding: false,
        addItemSuccess: true,
        items: [ ...state.items, item ],
      }
    }
  }

  return state;
}

export const getItems = (state: ItemsState) => state.items;
export const getItemsLoading = (state: ItemsState) => state.loadingItems;
export const getLoadItemsError = (state: ItemsState) => state.loadItemsError;
export const getLoadItemsSuccess = (state: ItemsState) => state.loadItemsSuccess;

export const getItemAdding = (state: ItemsState) => state.itemAdding;
export const getAddItemError = (state: ItemsState) => state.addItemError;
export const getAddItemSuccess = (state: ItemsState) => state.addItemSuccess;