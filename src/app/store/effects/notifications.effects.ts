import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { map, filter } from 'rxjs/operators';;

import { NotificationType } from 'src/app/shared/models';
import { AddNotification } from '../actions';

@Injectable()
export class NotificationEffects {
  constructor(private actions$: Actions) {}

  @Effect()
  failureNotification$ = this.actions$.pipe(
    filter((action: Action) => !!action['error']),
    map(
      action =>
        new AddNotification({
          notification: {
          type: NotificationType.error,
          message: action['error'],
        }
      })
    )
  );
}
