import {createSelector} from '@reduxjs/toolkit';
import Config from 'core/config/config';
import User from 'core/models/user/User';
import {request} from 'core/network/RestAPI';
import {transformClass} from 'core/redux/classTransformer';
import {createEpic} from 'core/redux/epicCommon';
import {createReduxSlice} from 'core/redux/reduxCommon';
import {RootState} from 'core/redux/rootReducer';

const URL = `${Config.baseUrl}/signIn`;

export interface SignInCredential {
  username: string;
  password: string;
}

export const signInSlice = createReduxSlice<SignInCredential>('signIn');

export const signIn = signInSlice.actions.request;

export const signInsEpic = (action$: any) =>
  createEpic<SignInCredential>(action$, signInSlice, (payload: SignInCredential) =>
    request(URL, 'post', payload),
  );

export const signInSelector = createSelector(
  (state: RootState) => state.user.signIn,
  item => transformClass(item, User),
);
