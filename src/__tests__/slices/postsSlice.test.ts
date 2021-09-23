import {getPosts} from 'core/redux/slices/postsSlice';
import postService from 'core/network/services/postService';
import {createTestStore} from '../utils/testUtils';
import mockData from '../utils/mockData';

describe('Tests for postsSlice', () => {
  beforeAll(() => {
    jest.spyOn(postService, 'getPosts').mockReturnValue(Promise.resolve(mockData.postsWithLength2));
  });

  test('getPosts should store correct value', async () => {
    const store = createTestStore();
    await store.dispatch(getPosts());
    const posts = store.getState().posts.data;
    expect(posts).toEqual(mockData.postsWithLength2);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
