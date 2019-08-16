import { Injectable } from '@angular/core';

import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';

import { ItemsService } from '../../services/items.service';
import { LoadItemsSuccess, LoadItemsFail, AddItem, AddItemSuccess, AddItemFail, RemoveItem, RemoveItemSuccess, RemoveItemFail, LoadItems } from '../actions/items.actions';

@Injectable()
export class ItemsEffects {
  constructor(private actions$:Actions, private itemsService: ItemsService) {}

  loadItems$ = createEffect(() => this.actions$.pipe(
    ofType(LoadItems.type),
    switchMap(() => this.itemsService.getItems().pipe(
      map(items => LoadItemsSuccess({ items })),
      catchError(error => of(LoadItemsFail({ error })))
    ))
  ));

  addItem$ = createEffect(() => this.actions$.pipe(
    ofType(AddItem.type),
    switchMap(({ item }) => this.itemsService.addItem(item).pipe(
      map(item => AddItemSuccess({ item })),
      catchError(error => of(AddItemFail({ error })))
    ))
  ));

  removeItem$ = createEffect(() => this.actions$.pipe(
    ofType(RemoveItem.type),
    switchMap(({ itemId }) => this.itemsService.removeItem(itemId).pipe(
      map(itemId => RemoveItemSuccess({ itemId })),
      catchError(error => of(RemoveItemFail({ itemId, error })))
    ))
  ));
}