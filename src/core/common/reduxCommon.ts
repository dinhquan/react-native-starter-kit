import {PayloadAction} from '@reduxjs/toolkit';

export enum ReduxStatus {
  None = 'none',
  Fetching = 'fetching',
  Done = 'done',
}

interface Error {
  status?: number;
  code?: string;
  message?: string;
}

export interface GenericState<T> {
  isFetching: boolean;
  status: ReduxStatus;
  data?: T;
  params?: any;
  error?: Error;
  actionType: string;
  success: boolean;
}

export function initialState<T>(data?: T): GenericState<T> {
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

export function pending(state: GenericState<any>, action: PayloadAction<any>) {
  state.status = ReduxStatus.Fetching;
  state.isFetching = true;
  state.params = action.payload;
  state.error = undefined;
  state.success = false;
  state.actionType = action.type;
}

export function fulfilled(state: GenericState<any>, action: PayloadAction<any>) {
  state.status = ReduxStatus.Done;
  state.isFetching = false;
  state.data = action.payload;
  state.error = undefined;
  state.success = true;
  state.actionType = action.type;
}

export function rejected(state: GenericState<any>, action: PayloadAction<any>) {
  state.status = ReduxStatus.Done;
  state.isFetching = false;
  // @ts-ignore
  state.error = action.error;
  state.success = false;
  state.actionType = action.type;
}
