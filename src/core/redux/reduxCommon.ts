import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import NetError from '../network/NetError';

export enum ReduxStatus {
  None = 'none',
  Fetching = 'fetching',
  Done = 'done',
}

export interface GenericState<T> {
  isFetching: boolean;
  status: ReduxStatus;
  data?: T;
  params?: any;
  error?: NetError;
  actionType: string;
  success: boolean;
}

function initialState<T>(data?: T): GenericState<T> {
  return {
    isFetching: false,
    params: undefined,
    data: data,
    error: undefined,
    success: false,
    actionType: '',
    status: ReduxStatus.None,
  };
}

function reset(state: GenericState<any>) {
  state.status = ReduxStatus.None;
  state.isFetching = false;
  state.error = undefined;
  state.success = false;
  state.actionType = '';
  state.data = undefined;
  state.params = undefined;
}

function request(state: GenericState<any>, action: PayloadAction<any>) {
  state.status = ReduxStatus.Fetching;
  state.isFetching = true;
  state.params = action.payload;
  state.error = undefined;
  state.success = false;
  state.actionType = action.type;
}

function success(state: GenericState<any>, action: PayloadAction<any>) {
  state.status = ReduxStatus.Done;
  state.isFetching = false;
  state.data = action.payload;
  state.error = undefined;
  state.success = true;
  state.actionType = action.type;
}

function failure(state: GenericState<any>, action: PayloadAction<any>) {
  state.status = ReduxStatus.Done;
  state.isFetching = false;
  state.error = action.payload;
  state.success = false;
  state.actionType = action.type;
}

export function createReduxSlice<T>(name: string) {
  return createSlice({
    name: name,
    initialState: initialState(),
    reducers: {
      request(state, action: PayloadAction<T>) {
        request(state, action);
      },
      success,
      failure,
      reset,
    },
  });
}
