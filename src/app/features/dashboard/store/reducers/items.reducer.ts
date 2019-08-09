import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';

import { Item } from '../../models';
import { ItemsAction, LOAD_ITEMS, LOAD_ITEMS_FAIL, LOAD_ITEMS_SUCCESS, ADD_ITEM, ADD_ITEM_FAIL, ADD_ITEM_SUCCESS, REMOVE_ITEM, REMOVE_ITEM_FAIL, REMOVE_ITEM_SUCCESS } from '../actions/items.actions';

export interface ItemsState extends EntityState<Item> {
  loadingItems: boolean;
  loadItemsError: any;
  loadItemsSuccess: boolean;

  itemAdding: boolean;
  addItemError: any;
  addItemSuccess: boolean;

  pendingRemoveItems: { [id: number]: Item };
}

export const itemAdapter: EntityAdapter<Item> = createEntityAdapter<Item>({
  selectId: i => i.id,
  sortComparer: (i1: Item, i2: Item) => i1.name.localeCompare(i2.name)
});

export const initialState: ItemsState = itemAdapter.getInitialState({
  loadingItems: false,
  loadItemsError: null,
  loadItemsSuccess: false,

  itemAdding: false,
  addItemError: null,
  addItemSuccess: false,

  pendingRemoveItems: {},
});

export function reducer(state: ItemsState = initialState, action: ItemsAction) : ItemsState {
  
  switch(action.type) {
    case LOAD_ITEMS: {
      return itemAdapter.removeAll({
        ...state,
        loadingItems: true,
        loadItemsError: null,
        loadItemsSuccess: false,
      });
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
      return itemAdapter.addAll(items, {
        ...state,
        loadingItems: false,
        loadItemsSuccess: true,
      });
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
      return itemAdapter.addOne(item, {
        ...state,
        itemAdding: false,
        addItemSuccess: true,
      });
    }

    case REMOVE_ITEM: {
      const { itemId } = action.payload;
      const pendingRemoveItems = {
        ...state.pendingRemoveItems,
        [itemId]: state.entities[itemId],
      };

      return {
        ...state,
        pendingRemoveItems,
      };
    }

    case REMOVE_ITEM_FAIL: {
      const { itemId } = action.payload;
      const { [itemId]: id, ...pendingRemoveItems } = state.pendingRemoveItems;

      return {
        ...state,
        pendingRemoveItems
      };
    }

    case REMOVE_ITEM_SUCCESS: {
      const { itemId } = action.payload;
      const { [itemId]: item, ...pendingRemoveItems } = state.pendingRemoveItems;

      return itemAdapter.removeOne(itemId, {
        ...state,
        pendingRemoveItems,
      });
    }
  }

  return state;
}

export const getItemsLoading = (state: ItemsState) => state.loadingItems;
export const getLoadItemsError = (state: ItemsState) => state.loadItemsError;
export const getLoadItemsSuccess = (state: ItemsState) => state.loadItemsSuccess;

export const getItemAdding = (state: ItemsState) => state.itemAdding;
export const getAddItemError = (state: ItemsState) => state.addItemError;
export const getAddItemSuccess = (state: ItemsState) => state.addItemSuccess;

export const getPendingRemoveItems = (state: ItemsState) => state.pendingRemoveItems;