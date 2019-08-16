import { TestBed } from '@angular/core/testing';

import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';

import * as fromRoot from 'src/app/store';
import * as fromFeature from '../store';
import * as fromItems from '../store/reducers/items.reducer';
import * as itemsSelectors from '../store/selectors/items.selectors';
import * as asyncActionState from 'src/app/shared/store/async-action-state';
import { DashboardFacadeService } from './dashboard.facade.service';

describe('DashboardFacadeService', () => {
  let facade: DashboardFacadeService;

  interface PartialState extends Partial<fromRoot.State> {
    dashboard: fromFeature.DashboardState;
  }

  let store: MockStore<PartialState>;
  const initialState:PartialState = {
    dashboard: {
      items: fromItems.initialState,
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DashboardFacadeService,
        provideMockStore({ initialState }),
      ],
    });

    facade = TestBed.get(DashboardFacadeService);
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  describe('function: dispatch', () => {
    it('should call store.dispatch', () => {
      const action = fromFeature.LoadItems();
      facade.dispatch(action);

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('stream: items$', () => {
    it('should dispatch a LoadItems action if not already loaded and should not emit anything', () => {
      const action = fromFeature.LoadItems();

      expect(facade.items$).toBeObservable(cold(''));
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('should not dispatch a LoadItems action if already loaded, and should emit the indication', () => {
      const items = [
        { id: 1, name: 'Mug', price: 4.50, isRemovalPending: false },
        { id: 2, name: 'Hat', price: 14.50, isRemovalPending: false },
      ];

      store.overrideSelector(itemsSelectors.getItemsLoadSuccess, true);
      store.overrideSelector(itemsSelectors.getItemsNeedLoading, false);
      // we can also set the result of a selector directly
      itemsSelectors.getItems.setResult([
        items[1],
        items[0],
      ]);

      expect(facade.items$).toBeObservable(cold('c', { c: [
        items[1],
        items[0],
      ] }));
      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });
});