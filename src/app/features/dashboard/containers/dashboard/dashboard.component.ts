import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { ItemsService } from '../../services';
import { Item, ViewItem } from '../../models';
import { NotificationService } from 'src/app/core/services';
import { NotificationType } from 'src/app/shared/models';
import { DashboardState } from '../../store/reducers';
import { getItems, getItemsLoading } from '../../store/selectors';
import { LoadItems } from '../../store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class DashboardComponent implements OnInit {
  constructor(private itemService: ItemsService, private notificationService: NotificationService, private store: Store<DashboardState>) { }
  items$: Observable<ViewItem[]>;
  itemsLoading$: Observable<boolean>;
  itemAdding = false;


  ngOnInit() {
    this.itemsLoading$ = this.store.pipe(select(getItemsLoading));
    this.items$ = this.store.pipe(select(getItems));

    this.store.dispatch(new LoadItems());
  }

  addItem(item: Item) {
    // this.itemAdding = true;
    // this.itemService.addItem(item).pipe(take(1)).subscribe(
    //   (i) => {
    //     this.items = [...this.items, {...i, isRemovalPending: false }].sort((a, b) => a.name.localeCompare(b.name));
    //     this.itemAdding = false;
    //   },
    //   error =>  {
    //     this.notificationService.addNotification({ message: error, type: NotificationType.error })
    //     this.itemAdding = false;
    //   }
    // );
  }

  removeItem(itemId: number) {
    // this.items.filter(item => item.id === itemId).forEach(item => item.isRemovalPending = true);
    // this.itemService.removeItem(itemId).pipe(take(1)).subscribe(
    //   () => this.items = this.items.filter(item => item.id !== itemId),
    //   error =>  {
    //     this.notificationService.addNotification({ message: error, type: NotificationType.error });
    //     this.items.filter(item => item.id === itemId).forEach(item => item.isRemovalPending = false);
    //   }
    // );
  }
}
