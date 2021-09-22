import {initialState} from 'core/common/reduxCommon';
import {getPosts, postsSlice} from 'core/redux/slices/postsSlice';
import createMockingStore from '../__helpers/mockStore';

test('should return initial value', () => {
  expect(postsSlice.reducer(undefined, {type: undefined})).toEqual(initialState());
});

test('getPosts', async () => {
  const store = createMockingStore();
  const posts = [
    {
      id: 1,
      name: 'Title 1',
      description: 'Description 1',
    },
  ];
  await store.dispatch(getPosts());
  const state = store.getState();
  expect(state.posts.data).toBeTruthy();
});
