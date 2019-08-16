import { createAction, props } from '@ngrx/store';

import { Item } from '../../models';


export const LoadItems = createAction('[Dashboard] Load Items');
export const LoadItemsFail = createAction('[Dashboard] Load Items Fail', props<{ error: any }>());
export const LoadItemsSuccess = createAction('[Dashboard] Load Items Success', props<{ items: Item[] }>());

export const AddItem = createAction('[Dashboard] Add Item', props<{ item: Item }>());
export const AddItemFail = createAction('[Dashboard] Add Item Fail', props<{ error: any }>());
export const AddItemSuccess = createAction('[Dashboard] Add Item Success', props<{ item: Item }>());

export const RemoveItem = createAction('[Dashboard] Remove Item', props<{ itemId: number }>());
export const RemoveItemFail = createAction('[Dashboard] RemoveAdd Item Fail', props<{ itemId: number, error: any }>());
export const RemoveItemSuccess = createAction('[Dashboard] Remove Item Success', props<{ itemId: number }>());