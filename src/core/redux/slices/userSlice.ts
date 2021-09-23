import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {transformClassFromExist} from 'core/common/classTransformer';
import {fulfilled, initialState, rejected, pending} from 'core/common/reduxCommon';
import {RootState} from 'core/redux/rootReducer';
import User from 'core/models/user/User';
import userService, {SignInCredential} from 'core/network/services/userService';

export const signIn = createAsyncThunk('user/signIn', async (credential: SignInCredential) => {
  return await userService.signIn(credential);
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
