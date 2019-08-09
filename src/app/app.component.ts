import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Notification } from './shared/models';
import * as fromStore from './store';
import { AppFacadeService } from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(private appFacade: AppFacadeService) {}

  notifications$ = this.appFacade.notifications$;

  dismissToast(notification: Notification) {
    this.appFacade.dispatch(new fromStore.RemoveNotification({ notification }));
  }
}
