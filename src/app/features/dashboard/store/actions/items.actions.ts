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

export type ItemsAction = LoadItemsAction;