import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromItems from './items.reducer';

export interface DashboardState {
  items: fromItems.ItemsState;
}

export const reducers: ActionReducerMap<DashboardState> = {
  items: fromItems.reducer,
};

export const getDashboardState = createFeatureSelector<DashboardState>('dashboard');