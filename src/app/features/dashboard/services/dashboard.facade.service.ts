import { Injectable } from '@angular/core';

import { Store, select, Action } from '@ngrx/store';
import { distinctUntilChanged, tap, switchMapTo, filter, shareReplay, skipUntil } from 'rxjs/operators';
import * as R from 'ramda';

import * as fromStore from '../store';


@Injectable()
export class DashboardFacadeService {
  constructor(private store: Store<fromStore.DashboardState>) {}

  items$ = this.store.pipe(select(fromStore.getItemsNeedLoading),
    distinctUntilChanged(),
    tap(R.when(R.identity, _ => this.dispatch(fromStore.LoadItems()))),
    switchMapTo(this.store.pipe(select(fromStore.getItems))),
    skipUntil(this.store.pipe(select(fromStore.getItemsLoadSuccess), filter(R.identity))),
    shareReplay(1)
  );

  itemsLoading$ = this.store.pipe(select(fromStore.getItemsLoading));
  itemAdding$ = this.store.pipe(select(fromStore.getItemAdding));

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}