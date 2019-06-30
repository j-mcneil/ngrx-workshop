import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { Item } from '../../models';

@Component({
  selector: 'app-item-builder',
  templateUrl: './item-builder.component.html',
  styleUrls: ['./item-builder.component.scss']
})
export class ItemBuilderComponent implements OnInit {
  @Input()
  isInProgress: boolean;

  @Output()
  addItem = new EventEmitter<Item>();

  constructor() { }

  ngOnInit() {
  }

  addNewItem(name: string, price: number) {
    this.addItem.emit({ name, price, id: -1 });
  }
}
