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

export type ItemsAction = LoadItemsAction | AddItemAction;