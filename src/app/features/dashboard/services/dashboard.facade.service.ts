import { Injectable } from '@angular/core';

import { Store, select, Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ViewItem } from '../models';
import * as fromStore from '../store';


@Injectable()
export class DashboardFacadeService {
  constructor(private store: Store<fromStore.DashboardState>) {}

  items$: Observable<ViewItem[]> = this.store.pipe(select(fromStore.getItems));
  itemsLoading$: Observable<boolean> = this.store.pipe(select(fromStore.getItemsLoading));
  itemAdding$: Observable<boolean> = this.store.pipe(select(fromStore.getItemAdding))

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}