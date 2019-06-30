import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { delay, flatMap } from 'rxjs/operators';

import { Item } from '../models';

@Injectable()
export class ItemsService {
  private incrementingId = 0;
  private items: Item[] = [
    { id: 1, name: 'Headlight Fluid', price: 3.29 },
    { id: 2, name: 'Laptop', price: 899.99 },
    { id: 3, name: 'Sunglasses', price: 19.99 },
    { id: 4, name: 'Yoyo', price: 129.99 },
    { id: 5, name: 'Fan', price: 29.99 },
    { id: 6, name: 'Pen', price: 2.79 },
    { id: 7, name: 'Headphones', price: 39.99 },
    { id: 8, name: 'Hat', price: 19.99 },
    { id: 9, name: 'Water Bottle', price: 15.99 },
    { id: 10, name: 'USB-C Cable', price: 5.99 },
    { id: 11, name: 'Smartphone', price: 599.99 },
    { id: 12, name: '29g Aquarium', price: 45.99 },
  ]; 

  constructor(private http: HttpClient) {}


  getItems() : Observable<Item[]> {
    this.incrementingId = this.items.map(item => item.id).reduce((acc, cur) => Math.max(acc, cur), -1);

    return of(this.items).pipe(delay(1000));
  }

  removeItem(itemId: number) : Observable<number> {
    return itemId !== 7 ? of(itemId).pipe(delay(1000)) : of(itemId).pipe(delay(1000), flatMap(id => throwError(`Hey, you can't remove that!`)));
  }

  addItem(item: Item) : Observable<Item> {
    return item.name !== 'Panda' ? of({...item, id: ++this.incrementingId}).pipe(delay(1000)) : of(item).pipe(delay(1000), flatMap(id => throwError(`You can't sell Pandas!`)));
  }
}