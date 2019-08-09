import { Injectable } from '@angular/core';

import { Store, Action, select } from '@ngrx/store';

import * as fromStore from 'src/app/store';

@Injectable()
export class AppFacadeService {
  constructor(private store: Store<fromStore.State>) {}

  notifications$ = this.store.pipe(select(fromStore.getNotifications));


  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
