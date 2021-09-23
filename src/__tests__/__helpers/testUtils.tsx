import React from 'react';
import {renderHook} from '@testing-library/react-hooks';
import {Provider} from 'react-redux';
import createMockStore from './mockStore';

export function renderHookWithMockStore<T>(hook: T) {
  const {result} = renderHook(() => hook, {
    wrapper: ({children}) => <Provider store={createMockStore()}>{children}</Provider>,
  });
  return result;
}
