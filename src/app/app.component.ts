import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { NotificationService } from './core/services';
import { Notification } from './shared/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private notificationService: NotificationService) {}

  notifications$ = this.notificationService.notifications$;

  dismissToast(notification: Notification) {
    this.notificationService.removeNotification(notification);
  }
}
