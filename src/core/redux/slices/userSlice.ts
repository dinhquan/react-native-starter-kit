import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import Config from 'core/redux/config';
import {request} from 'core/network/api';
import {transformClassFromExist} from 'core/common/classTransformer';
import {fulfilled, initialState, rejected, pending} from 'core/common/reduxCommon';
import {RootState} from 'core/redux/rootReducer';
import User from 'core/models/user/User';

export interface SignInCredential {
  username: string;
  password: string;
}

export const signIn = createAsyncThunk('user/signIn', async (credential: SignInCredential) => {
  return await request(`${Config.baseUrl}/signIn`, 'post', credential);
});

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState(),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(signIn.pending, pending);
    builder.addCase(signIn.fulfilled, fulfilled);
    builder.addCase(signIn.rejected, rejected);
  },
});

export const userSelector = createSelector(
  (state: RootState) => state.user,
  item => transformClassFromExist(item, User),
);
