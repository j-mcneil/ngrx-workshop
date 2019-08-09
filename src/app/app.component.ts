import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Notification } from './shared/models';
import * as fromStore from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<fromStore.State>) {}

  notifications$: Observable<Notification[]>;

  ngOnInit() {
    this.notifications$ = this.store.pipe(select(fromStore.getNotifications));
  }

  dismissToast(notification: Notification) {
    this.store.dispatch(new fromStore.RemoveNotification({ notification }));
  }
}
