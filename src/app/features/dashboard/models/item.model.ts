export interface Item {
  id: number;
  name: string;
  price: number;
}

export interface ViewItem extends Item {
  isRemovalPending: boolean;
}