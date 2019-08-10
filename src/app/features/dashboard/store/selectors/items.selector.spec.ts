import * as fromReducer from '../reducers/items.reducer';
import * as fromSelectors from './items.selectors';

describe('Items Selectors', () => {
  describe('getItemState', () => {
    it('should return the items state', () => {
      expect(fromSelectors.getItemsState.projector({ items: fromReducer.initialState })).toBe(fromReducer.initialState);
    });
  });

  describe('getItems', () => {
    it('should return items with isPendingRemoval flag', () => {
      expect(fromSelectors.getItems.projector([
          { id: 1, name: 'Mug', price: 4.50 },
          { id: 2, name: 'Hat', price: 14.50 },
        ],
        { 1: { id: 1, name: 'Mug', price: 4.50 } }
      )).toEqual([
        { id: 1, name: 'Mug', price: 4.50, isRemovalPending: true },
        { id: 2, name: 'Hat', price: 14.50, isRemovalPending: false },
      ]);
    });
  });

});
