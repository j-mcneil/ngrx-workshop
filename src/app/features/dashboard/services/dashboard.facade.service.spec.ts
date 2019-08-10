import { TestBed } from '@angular/core/testing';

import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';

import * as fromRoot from 'src/app/store';
import * as fromFeature from '../store';
import * as fromItems from '../store/reducers/items.reducer';
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
      const action = new fromFeature.LoadItems();
      facade.dispatch(action);

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('stream: items$', () => {
    it('should dispatch a LoadItems action if not already loaded and should not emit anything', () => {
      const action = new fromFeature.LoadItems();

      expect(facade.items$).toBeObservable(cold(''));
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('should not dispatch a LoadItems action if already loaded, and should emit the indication', () => {
      const items = [
        { id: 1, name: 'Mug', price: 4.50 },
        { id: 2, name: 'Hat', price: 14.50 },
      ];

      store.setState({
        ...initialState,
        dashboard: {
          ...initialState.dashboard,
          items: {
            ...initialState.dashboard.items,
            ids: [2, 1],
            entities: { 1: items[0], 2: items[1] },
            loadItems: asyncActionState.successState,
          },
        },
      });

      expect(facade.items$).toBeObservable(cold('c', { c: [
        { ...items[1], isRemovalPending: false },
        { ...items[0], isRemovalPending: false },
      ] }));
      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });
});