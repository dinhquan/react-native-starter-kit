import {createSelector} from '@reduxjs/toolkit';
import Config from 'core/redux/config';
import User from 'core/models/user/User';
import {request} from 'core/network/RestAPI';
import {transformClassFromExist} from 'core/common/classTransformer';
import {createEpic} from 'core/common/epicCommon';
import {createReduxSlice} from 'core/common/reduxCommon';
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
  item => transformClassFromExist(item, User),
);
