import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { ItemsService } from '../../services';
import { Item, ViewItem } from '../../models';
import { NotificationService } from 'src/app/core/services';
import { NotificationType } from 'src/app/shared/models';
import { DashboardState } from '../../store/reducers';
import { getItems, getItemsLoading, getItemAdding } from '../../store/selectors';
import { LoadItems, AddItem, RemoveItem } from '../../store';

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
  itemAdding$: Observable<boolean>;


  ngOnInit() {
    this.itemsLoading$ = this.store.pipe(select(getItemsLoading));
    this.items$ = this.store.pipe(select(getItems));
    this.itemAdding$ = this.store.pipe(select(getItemAdding));

    this.store.dispatch(new LoadItems());
  }

  addItem(item: Item) {
    this.store.dispatch(new AddItem({ item }));
  }

  removeItem(itemId: number) {
    this.store.dispatch(new RemoveItem({ itemId }));
  }
}
