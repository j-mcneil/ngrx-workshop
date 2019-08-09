import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';

import { Item } from '../../models';
import { ItemsAction, LOAD_ITEMS, LOAD_ITEMS_FAIL, LOAD_ITEMS_SUCCESS, ADD_ITEM, ADD_ITEM_FAIL, ADD_ITEM_SUCCESS, REMOVE_ITEM, REMOVE_ITEM_FAIL, REMOVE_ITEM_SUCCESS } from '../actions/items.actions';
import * as asyncActionState from 'src/app/shared/store/async-action-state';

export interface ItemsState extends EntityState<Item> {
  loadItems: asyncActionState.AsyncActionState;
  addItem: asyncActionState.AsyncActionState;

  pendingRemoveItems: { [id: number]: Item };
}

export const itemAdapter: EntityAdapter<Item> = createEntityAdapter<Item>({
  selectId: i => i.id,
  sortComparer: (i1: Item, i2: Item) => i1.name.localeCompare(i2.name)
});

export const initialState: ItemsState = itemAdapter.getInitialState({
  loadItems: asyncActionState.initialState,
  addItem: asyncActionState.initialState,
  pendingRemoveItems: {},
});

export function reducer(state: ItemsState = initialState, action: ItemsAction) : ItemsState {
  
  switch(action.type) {
    case LOAD_ITEMS: {
      return itemAdapter.removeAll({
        ...state,
        loadItems: asyncActionState.inProgressState,
      });
    }

    case LOAD_ITEMS_FAIL: {
      const error = action.error;
      return {
        ...state,
        loadItems: asyncActionState.errorState(error),
      };
    }

    case LOAD_ITEMS_SUCCESS: {
      const { items } = action.payload;
      return itemAdapter.addAll(items, {
        ...state,
        loadItems: asyncActionState.successState,
      });
    }

    case ADD_ITEM: {
      return {
        ...state,
        addItem: asyncActionState.inProgressState,
      };
    }

    case ADD_ITEM_FAIL: {
      const error = action.error;
      return {
        ...state,
        addItem: asyncActionState.errorState(error),
      };
    }

    case ADD_ITEM_SUCCESS: {
      const { item } = action.payload;
      return itemAdapter.addOne(item, {
        ...state,
        addItem: asyncActionState.successState,
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

export const getPendingRemoveItems = (state: ItemsState) => state.pendingRemoveItems;