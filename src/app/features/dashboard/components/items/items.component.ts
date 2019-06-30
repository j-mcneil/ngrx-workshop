import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


import { Item, ViewItem } from '../../models';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  @Input()
  items: ViewItem[];
  
  @Output()
  removeItem = new EventEmitter<number>();


  constructor() { }

  ngOnInit() {
  }

  itemRemoved(itemId: number) {
    this.removeItem.next(itemId);
  }
}
