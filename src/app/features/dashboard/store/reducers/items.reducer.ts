import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';

import { Item } from '../../models';
import * as itemActions from '../actions/items.actions';
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

export const reducer = createReducer(
  initialState,
  on(itemActions.LoadItems, state => itemAdapter.removeAll({
    ...state,
    loadItems: asyncActionState.inProgressState,
  })),
  
  on(itemActions.LoadItemsFail, (state, { error }) => ({
    ...state,
    loadItems: asyncActionState.errorState(error),
  })),

  on(itemActions.LoadItemsSuccess, (state, { items }) => itemAdapter.addAll(items, {
    ...state,
    loadItems: asyncActionState.successState,
  })),

  on(itemActions.AddItem, state => ({
    ...state,
    addItem: asyncActionState.inProgressState,
  })),

  on(itemActions.AddItemFail, (state, { error }) => ({
    ...state,
    addItem: asyncActionState.errorState(error),
  })),
  
  on(itemActions.AddItemSuccess, (state, { item }) => itemAdapter.addOne(item, {
    ...state,
    addItem: asyncActionState.successState,
  })),

  on(itemActions.RemoveItem, (state, { itemId }) => {
    const pendingRemoveItems = {
      ...state.pendingRemoveItems,
      [itemId]: state.entities[itemId],
    };

    return {
      ...state,
      pendingRemoveItems,
    };
  }),

  on(itemActions.RemoveItemFail, (state, { itemId }) => {
    const { [itemId]: id, ...pendingRemoveItems } = state.pendingRemoveItems;

    return {
      ...state,
      pendingRemoveItems
    };
  }),

  on(itemActions.RemoveItemSuccess, (state, { itemId }) => {
    const { [itemId]: item, ...pendingRemoveItems } = state.pendingRemoveItems;

    return itemAdapter.removeOne(itemId, {
      ...state,
      pendingRemoveItems,
    });
  }),
);

export const getPendingRemoveItems = (state: ItemsState) => state.pendingRemoveItems;