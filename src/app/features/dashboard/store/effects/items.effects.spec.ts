import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { cold, hot } from 'jasmine-marbles';

import { ItemsEffects } from './items.effects';
import { ItemsService } from '../../services';
import * as itemsActions from '../actions/items.actions';
import { Item } from '../../models';

describe('ItemsEffects', () => {
  let actions$: Observable<any>;
  let effects: ItemsEffects;
  let service: ItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ItemsEffects, provideMockActions(() => actions$), ItemsService],
    });

    effects = TestBed.get(ItemsEffects);
    service = TestBed.get(ItemsService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadItems$', () => {
    it('should return items from LoadItemsSuccess', () => {
      const items = [
        { id: 1, name: 'Mug', price: 4.50 },
        { id: 2, name: 'Hat', price: 14.50 },
      ];
      spyOn(service, 'getItems').and.returnValue(of(items));

      const action = itemsActions.LoadItems();
      const completion = itemsActions.LoadItemsSuccess({ items });


      actions$ = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });
      expect(effects.loadItems$).toBeObservable(expected);
    });

    it('should return an error from LoadItemsFail when the service throws an error', () => {
      const error = 'some error';
      spyOn(service, 'getItems').and.returnValue(throwError(error));

      const action = itemsActions.LoadItems();
      const completion = itemsActions.LoadItemsFail({ error });

      actions$ = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });
      expect(effects.loadItems$).toBeObservable(expected);
    });
  });

  describe('addItem$', () => {
    it('should return an item from AddItemSuccess', () => {
      const item = { id: 1, name: 'Mug', price: 4.50, isRemovalPending: false };
      spyOn(service, 'addItem').and.returnValue(of(item));

      const action = itemsActions.AddItem({ item: { ...item, id: -1 } });
      const completion = itemsActions.AddItemSuccess({ item });

      actions$ = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });
      expect(effects.addItem$).toBeObservable(expected);
    });

    it('should return an error from AddItemFail when the service throws an error', () => {
      const item = { id: 1, name: 'Mug', price: 4.50, isRemovalPending: false };
      const error = 'some error';
      spyOn(service, 'addItem').and.returnValue(throwError(error));

      const action = itemsActions.AddItem({ item: { ...item, id: -1 } });
      const completion = itemsActions.AddItemFail({ error });

      actions$ = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });
      expect(effects.addItem$).toBeObservable(expected);
    });
  });

  describe('removeItem$', () => {
    it('should return the removed item id from RemoveItemSuccess', () => {
      const itemId = 10;
      spyOn(service, 'removeItem').and.returnValue(of(itemId));

      const action = itemsActions.RemoveItem({ itemId });
      const completion = itemsActions.RemoveItemSuccess({ itemId });

      actions$ = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });
      expect(effects.removeItem$).toBeObservable(expected);
    });

    it('should return an error and the item id from RemoveItemFail when the service throws an error', () => {
      const itemId = 10;
      const error = 'some error';
      spyOn(service, 'removeItem').and.returnValue(throwError(error));

      const action = itemsActions.RemoveItem({ itemId });
      const completion = itemsActions.RemoveItemFail({ itemId, error });

      actions$ = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });
      expect(effects.removeItem$).toBeObservable(expected);
    });
  });
});
