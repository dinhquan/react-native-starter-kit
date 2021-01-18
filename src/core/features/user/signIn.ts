import {createSelector, PayloadAction} from '@reduxjs/toolkit';
import {from, of} from 'rxjs';
import {catchError, filter, map, mergeMap} from 'rxjs/operators';
import {createReduxSlice} from 'core/redux/reduxCommon';
import {RootState} from 'core/redux/rootReducer';
import {request} from 'core/network/RestAPI';
import Config from 'core/config/config';
import User from 'core/models/user/User';
import {transformClass} from 'core/redux/classTransformer';

export interface SignInCredential {
  username: string;
  password: string;
}

export const signInSlice = createReduxSlice<SignInCredential>('signIn');

export const {request: signIn} = signInSlice.actions;

export const signInsEpic = (action$: any) => {
  return action$.pipe(
    filter(signIn.match),
    mergeMap((action: PayloadAction<SignInCredential>) =>
      from(request(URL, 'post', action.payload)).pipe(
        map(signInSlice.actions.success),
        catchError(error => of(signInSlice.actions.failure(error))),
      ),
    ),
  );
};

export const signInSelector = createSelector(
  (state: RootState) => state.user.signIn,
  item => transformClass(item, User),
);

const URL = `${Config.baseUrl}/signIn`;
