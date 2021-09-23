import usePostScreen from 'app/components/post/usePostScreen';
import {Provider} from 'react-redux';
import {renderHook} from '@testing-library/react-hooks';
import {createTestStore} from '../../utils/testUtils';
import mockData from '../../utils/mockData';
import React from 'react';
import postService from 'core/network/services/postService';

function render() {
  const result = renderHook(() => usePostScreen(), {
    wrapper: ({children}) => <Provider store={createTestStore()}>{children}</Provider>,
  });
  return result;
}

describe('Tests for usePostScreen', () => {
  test('Return posts correctly', async () => {
    jest.spyOn(postService, 'getPosts').mockReturnValue(Promise.resolve(mockData.postsWithLength2));
    const {result, waitForNextUpdate} = render();
    await waitForNextUpdate();
    expect(result.current.posts.length).toBe(2);
  });

  test('Service error, return empty posts', async () => {
    jest.spyOn(postService, 'getPosts').mockReturnValue(Promise.reject({}));
    const {result, waitForNextUpdate} = render();
    await waitForNextUpdate();
    expect(result.current.posts.length).toBe(0);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
