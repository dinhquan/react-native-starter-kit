import mockData from '../utils/mockData';
import {signIn, userSlice} from 'core/redux/slices/userSlice';
import {initialState} from 'core/common/reduxCommon';

const credential = {username: 'quan', password: 'quan123'};

describe('Tests for userSlice', () => {
  test('sign in fulfilled', () => {
    const action = signIn.fulfilled(mockData.user1, '', credential);
    const state = userSlice.reducer(initialState(), action);
    expect(state.data).toBe(mockData.user1);
    expect(state.isFetching).toBe(false);
    expect(state.success).toBe(true);
  });

  test('sign in rejected', () => {
    const action = signIn.rejected(null, '', credential);
    const state = userSlice.reducer(initialState(), action);
    expect(state.data).toBeFalsy();
    expect(state.isFetching).toBe(false);
    expect(state.success).toBe(false);
  });
});
