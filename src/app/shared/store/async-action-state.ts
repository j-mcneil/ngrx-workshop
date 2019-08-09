import { createSelector, Selector } from '@ngrx/store';
import * as R from 'ramda';

export interface AsyncActionState {
  inProgress: boolean;
  error: any;
  success: boolean;
}

export const getInProgress = (state: AsyncActionState) => state.inProgress;
export const getError = (state: AsyncActionState) => state.error;
export const getSuccess = (state: AsyncActionState) => state.success;

export function getSelectors<T>(
  selectState: Selector<object, T>,
  asyncActionStateProjector: (state: T) => AsyncActionState
) {
  const getAsyncActionState = createSelector(selectState, asyncActionStateProjector);

  const getInProgressSelector = createSelector(getAsyncActionState, getInProgress);
  const getErrorSelector = createSelector(getAsyncActionState, getError);
  const getSuccessSelector = createSelector(getAsyncActionState, getSuccess);

  return {
    getInProgress: getInProgressSelector,
    getError: getErrorSelector,
    getSuccess: getSuccessSelector,
    getNeedsFiring: createSelector(
      getInProgressSelector,
      getErrorSelector,
      getSuccessSelector,
      R.complement(R.unapply(R.any(R.identity)))
    ),
  };
}

export const initialState: AsyncActionState = {
  inProgress: false,
  error: null,
  success: false,
};

export const inProgressState: AsyncActionState = {
  inProgress: true,
  error: null,
  success: false,
};

export const errorState = (error: any) => ({
  inProgress: false,
  error,
  success: false,
});

export const successState = {
  inProgress: false,
  error: null,
  success: true,
};
