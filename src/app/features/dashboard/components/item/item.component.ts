import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ViewItem } from '../../models';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent implements OnInit {
  @Input()
  item: ViewItem;

  @Output()
  remove = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  removeItem(itemId: number) {
    this.remove.next(itemId)
  }

}
