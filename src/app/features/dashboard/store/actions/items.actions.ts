import { Action } from '@ngrx/store';

import { Item } from '../../models';

export const LOAD_ITEMS = '[Dashboard] Load Items';
export const LOAD_ITEMS_FAIL = '[Dashboard] Load Items Fail';
export const LOAD_ITEMS_SUCCESS = '[Dashboard] Load Items Success';

export class LoadItems implements Action {
  readonly type = LOAD_ITEMS;
}

export class LoadItemsFail implements Action {
  readonly type = LOAD_ITEMS_FAIL;
  constructor(public error: any) {}
}

export class LoadItemsSuccess implements Action {
  readonly type = LOAD_ITEMS_SUCCESS;
  constructor(public payload: { items: Item[] }) {}
}

type LoadItemsAction = LoadItems | LoadItemsFail | LoadItemsSuccess;

export const ADD_ITEM = '[Dashboard] Add Item';
export const ADD_ITEM_FAIL = '[Dashboard] Add Item Fail';
export const ADD_ITEM_SUCCESS = '[Dashboard] Add Item Success';

export class AddItem implements Action {
  readonly type = ADD_ITEM;
  constructor(public payload: { item: Item }) {}
}

export class AddItemFail implements Action {
  readonly type = ADD_ITEM_FAIL;
  constructor(public error: any) {}
}

export class AddItemSuccess implements Action {
  readonly type = ADD_ITEM_SUCCESS;
  constructor(public payload: { item: Item }) {}
}

export type AddItemAction = AddItem | AddItemFail | AddItemSuccess;

export const REMOVE_ITEM = '[Dashboard] Remove Item';
export const REMOVE_ITEM_FAIL = '[Dashboard] Remove Item Fail';
export const REMOVE_ITEM_SUCCESS = '[Dashboard] Remove Item Success';

export class RemoveItem implements Action {
  readonly type = REMOVE_ITEM;
  constructor(public payload: { itemId: number }) {}
}

export class RemoveItemFail implements Action {
  readonly type = REMOVE_ITEM_FAIL;
  constructor(public payload: { itemId: number }, public error: any) {}
}

export class RemoveItemSuccess implements Action {
  readonly type = REMOVE_ITEM_SUCCESS;
  constructor(public payload: { itemId: number }) {}
}

export type RemoveItemAction = RemoveItem | RemoveItemFail | RemoveItemSuccess;

export type ItemsAction = LoadItemsAction | AddItemAction | RemoveItemAction;