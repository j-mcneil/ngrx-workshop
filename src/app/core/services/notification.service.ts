import { Injectable } from "@angular/core";

import { Observable, BehaviorSubject } from 'rxjs';

import { Notification } from 'src/app/shared/models';

@Injectable()
export class NotificationService {
  notifications$ = new BehaviorSubject<Notification[]>([]);

  addNotification(notification: Notification) {
    this.notifications$.next([...this.notifications$.getValue(), notification])
  }

  removeNotification(notification: Notification) {
    this.notifications$.next(this.notifications$.getValue().filter(n => notification !== n))
  }
}