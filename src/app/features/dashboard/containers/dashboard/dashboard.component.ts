import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Item } from '../../models';
import { LoadItems, AddItem, RemoveItem } from '../../store';
import { DashboardFacadeService } from '../../services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class DashboardComponent implements OnInit {
  constructor(private dashboardFacade: DashboardFacadeService) { }
  items$ = this.dashboardFacade.items$;
  itemsLoading$ = this.dashboardFacade.itemsLoading$;
  itemAdding$ = this.dashboardFacade.itemAdding$;


  ngOnInit() {
    this.dashboardFacade.dispatch(new LoadItems());
  }

  addItem(item: Item) {
    this.dashboardFacade.dispatch(new AddItem({ item }));
  }

  removeItem(itemId: number) {
    this.dashboardFacade.dispatch(new RemoveItem({ itemId }));
  }
}
