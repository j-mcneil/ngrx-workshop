import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { ItemsService } from '../../services/items.service';
import { LOAD_ITEMS, LoadItemsSuccess, LoadItemsFail, ADD_ITEM, AddItem, AddItemSuccess, AddItemFail } from '../actions/items.actions';

@Injectable()
export class ItemsEffects {
  constructor(private actions$:Actions, private itemsService: ItemsService) {}

  @Effect()
  loadItems$ = this.actions$.pipe(
    ofType(LOAD_ITEMS),
    switchMap(() => this.itemsService.getItems().pipe(
      map(items => new LoadItemsSuccess({ items })),
      catchError(error => of(new LoadItemsFail(error)))
    ))
  )

  @Effect()
  addItem$ = this.actions$.pipe(
    ofType(ADD_ITEM),
    map((action: AddItem) => action.payload),
    switchMap(({ item }) => this.itemsService.addItem(item).pipe(
      map(item => new AddItemSuccess({ item })),
      catchError(error => of(new AddItemFail(error)))
    ))
  )

}