import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

import { ItemsService } from '../../services';
import { Item, ViewItem } from '../../models';
import { NotificationService } from 'src/app/core/services';
import { NotificationType } from 'src/app/shared/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class DashboardComponent implements OnInit {
  constructor(private itemService: ItemsService, private notificationService: NotificationService) { }
  items: ViewItem[];
  itemsLoading = false;
  itemAdding = false;


  ngOnInit() {
    this.itemsLoading = true;
    this.itemService.getItems().pipe(take(1)).subscribe(items => {
      this.items = items.map(item => ({ ...item, isRemovalPending: false })).sort((a, b) => a.name.localeCompare(b.name));
      this.itemsLoading = false;
    });
  }

  addItem(item: Item) {
    this.itemAdding = true;
    this.itemService.addItem(item).pipe(take(1)).subscribe(
      () => {
        this.items = [...this.items, {...item, isRemovalPending: false }].sort((a, b) => a.name.localeCompare(b.name));
        this.itemAdding = false;
      },
      error =>  {
        this.notificationService.addNotification({ message: error, type: NotificationType.error })
        this.itemAdding = false;
      }
    );
  }

  removeItem(itemId: number) {
    this.items.filter(item => item.id === itemId).forEach(item => item.isRemovalPending = true);
    this.itemService.removeItem(itemId).pipe(take(1)).subscribe(
      () => this.items = this.items.filter(item => item.id !== itemId),
      error =>  {
        this.notificationService.addNotification({ message: error, type: NotificationType.error });
        this.items.filter(item => item.id === itemId).forEach(item => item.isRemovalPending = false);
      }
    );
  }
}
