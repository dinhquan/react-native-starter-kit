import {getPosts, postsSlice} from 'core/redux/slices/postsSlice';
import postService from 'core/network/services/postService';
import {createTestStore} from '../utils/testUtils';
import mockData from '../utils/mockData';
import {initialState} from 'core/common/reduxCommon';

describe('Tests for postsSlice', () => {
  test('getPosts should store correct value', async () => {
    jest.spyOn(postService, 'getPosts').mockReturnValue(Promise.resolve(mockData.postsWithLength2));
    const store = createTestStore();
    await store.dispatch(getPosts());
    const posts = store.getState().posts.data;
    expect(posts).toEqual(mockData.postsWithLength2);
  });

  test('get posts fulfilled', () => {
    const action = getPosts.fulfilled(mockData.postsWithLength2, '');
    const state = postsSlice.reducer(initialState(), action);
    expect(state.data).toBe(mockData.postsWithLength2);
    expect(state.isFetching).toBe(false);
    expect(state.success).toBe(true);
  });

  test('get posts rejected', () => {
    const action = getPosts.rejected(null, '');
    const state = postsSlice.reducer(initialState(), action);
    expect(state.data).toBeFalsy();
    expect(state.isFetching).toBe(false);
    expect(state.success).toBe(false);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
