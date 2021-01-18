import {PayloadAction} from '@reduxjs/toolkit';
import {from, of} from 'rxjs';
import {catchError, filter, map, mergeMap} from 'rxjs/operators';

export function createEpic<T>(action$: any, slice: any, input: (payload: T) => Promise<any>) {
  return action$.pipe(
    filter(slice.actions.request.match),
    mergeMap((action: PayloadAction<T>) =>
      from(input(action.payload)).pipe(
        map(slice.actions.success),
        catchError(error => of(slice.actions.failure(error))),
      ),
    ),
  );
}
