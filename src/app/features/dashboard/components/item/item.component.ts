import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewItem } from '../../models';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
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
