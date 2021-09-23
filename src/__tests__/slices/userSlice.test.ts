import userService from 'core/network/services/userService';
import {createTestStore} from '../utils/testUtils';
import mockData from '../utils/mockData';
import {signIn} from 'core/redux/slices/userSlice';

describe('Tests for userSlice', () => {
  beforeAll(() => {
    jest.spyOn(userService, 'signIn').mockReturnValue(Promise.resolve(mockData.user1));
  });

  test('getPosts should store correct value', async () => {
    const store = createTestStore();
    const credential = {username: 'quan', password: 'quan123'};
    await store.dispatch(signIn(credential));
    const posts = store.getState().user.data;
    expect(posts).toEqual(mockData.user1);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
