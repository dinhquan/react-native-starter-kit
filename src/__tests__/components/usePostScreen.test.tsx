import usePostScreen from 'app/components/post/usePostScreen';
import {Provider} from 'react-redux';
import {mockUseDispatch} from '../utils/mockHooks';
import {renderHook} from '@testing-library/react-hooks';
import createMockStore from '../utils/mockStore';
import React from 'react';

function render() {
  const {result} = renderHook(() => usePostScreen(), {
    wrapper: ({children}) => <Provider store={createMockStore()}>{children}</Provider>,
  });
  return result;
}

describe('Tests for usePostScreen', () => {
  beforeAll(() => {
    mockUseDispatch();
  });

  test('Return correct posts', () => {
    const result = render();
    expect(result.current.posts).toBeTruthy();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
