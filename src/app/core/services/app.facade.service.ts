import { Injectable } from '@angular/core';

import { Store, Action, select } from '@ngrx/store';
import * as R from 'ramda';

import * as fromStore from 'src/app/store';
import { map } from 'rxjs/operators';

@Injectable()
export class AppFacadeService {
  constructor(private store: Store<fromStore.State>) {}

  notifications$ = this.store.pipe(select(fromStore.getNotifications));
  isDarkTheme$ = this.store.pipe(select(fromStore.getTheme), map(R.equals('dark')));


  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
