import { reducer, initialState } from './items.reducer';
import * as itemsActions from '../actions/items.actions';
import * as asyncActionState from 'src/app/shared/store/async-action-state';
import { Item } from '../../models';

describe('LeadReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action: any = {};
      const state = reducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LoadItems Actions', () => {
    describe('LOAD_ITEMS action', () => {
      it('should set loadItems:inProgress bit to true', () => {
        const action = new itemsActions.LoadItems();
        const state = reducer(initialState, action);

        expect(state).toEqual({
          ...initialState,
          loadItems: asyncActionState.inProgressState,
        });
      });
    });

    describe('LOAD_ITEMS_FAIL action', () => {
      it('should set loadItems: error', () => {
        const action = new itemsActions.LoadItemsFail('error');
        const state = reducer(initialState, action);
        expect(state).toEqual({
          ...initialState,
          loadItems: asyncActionState.errorState('error'),
        });
      });
    });

    describe('LOAD_ITEMS_SUCCESS action', () => {
      it('should set the loadItems: success bit and set the items', () => {
        const items = [
          { id: 1, name: 'Mug', price: 4.50 },
          { id: 2, name: 'Hat', price: 14.50 },
        ];

        const action = new itemsActions.LoadItemsSuccess({ items });
        const state = reducer(initialState, action);

        expect(state).toEqual({
          ...initialState,
          ids: [2, 1],
          entities: {
            1: items[0],
            2: items[1]
          },
          loadItems: asyncActionState.successState,
        });
      });
    });
  });

  describe('AddItem Actions', () => {
    describe('ADD_ITEM action', () => {
      it('should set addItem:inProgress bit to true', () => {
        const item = { id: 1, name: 'Mug', price: 4.50 };
        const action = new itemsActions.AddItem({ item });
        const state = reducer(initialState, action);

        expect(state).toEqual({
          ...initialState,
          addItem: asyncActionState.inProgressState,
        });
      });
    });

    describe('ADD_ITEM_FAIL action', () => {
      it('should set addItem: error', () => {
        const action = new itemsActions.AddItemFail('error');
        const state = reducer(initialState, action);
        expect(state).toEqual({
          ...initialState,
          addItem: asyncActionState.errorState('error'),
        });
      });
    });

    describe('ADD_ITEM_SUCCESS action', () => {
      it('should set the addItem: success bit and add the item', () => {
        const item = { id: 1, name: 'Mug', price: 4.50 };

        const action = new itemsActions.AddItemSuccess({ item });
        const state = reducer(initialState, action);

        expect(state).toEqual({
          ...initialState,
          ids: [1],
          entities: {
            1: item,
          },
          addItem: asyncActionState.successState,
        });
      });
    });
  });

  describe('RemoveItem Actions', () => {
    describe('REMOVE_ITEM action', () => {
      it('should add the item to pendingRemoveItems', () => {
        const item = { id: 1, name: 'Mug', price: 4.50 };
        const action = new itemsActions.RemoveItem({ itemId: item.id });
        const state = reducer({
          ...initialState,
          ids: [1],
          entities: { 1: item },
        }, action);

        expect(state).toEqual({
          ...initialState,
          ids: [1],
          entities: { 1: item },
          pendingRemoveItems: { 1: item },
        });
      });
    });

    describe('REMOVE_ITEM_FAIL action', () => {
      it('should set remove the item from pendingRemoveItems', () => {
        const item = { id: 1, name: 'Mug', price: 4.50 };
        const action = new itemsActions.RemoveItemFail({ itemId: item.id }, 'error');
        const state = reducer({
          ...initialState,
          pendingRemoveItems: { 1: item },
        }, action);

        expect(state).toEqual({
          ...initialState,
          pendingRemoveItems: {}
        });
      });
    });

    describe('REMOVE_ITEM_SUCCESS action', () => {
      it('should remove the item from pendingRemoveItems and from the items', () => {
        const items = [
          { id: 1, name: 'Mug', price: 4.50 },
          { id: 2, name: 'Hat', price: 14.50 },
        ];

        const action = new itemsActions.RemoveItemSuccess({ itemId: items[0].id });
        const state = reducer({
          ...initialState,
          ids: [2, 1],
          entities: { 1: items[0], 2: items[1] },
          pendingRemoveItems: { 1: items[0] }
        }, action);

        expect(state).toEqual({
          ...initialState,
          ids: [2],
          entities: {
            2: items[1],
          },
          pendingRemoveItems: {},
        });
      });
    });
  });
});
