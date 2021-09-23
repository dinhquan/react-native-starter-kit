import {Provider} from 'react-redux';
import {renderHook, act} from '@testing-library/react-hooks';
import {createTestStore} from '../../utils/testUtils';
import mockData from '../../utils/mockData';
import React from 'react';
import useUserScreen from 'app/components/user/useUserScreen';
import userService, {SignInCredential} from 'core/network/services/userService';

function render() {
  const credential: SignInCredential = {username: 'quan', password: 'quan123'};
  const result = renderHook(() => useUserScreen(credential), {
    wrapper: ({children}) => <Provider store={createTestStore()}>{children}</Provider>,
  });
  return result;
}

describe('Tests for useUserScreen', () => {
  test('Not signed in state', async () => {
    const {result} = render();
    expect(result.current.hasSignedIn).toBe(false);
    expect(result.current.user).toBeFalsy();
  });

  test('Sign in success', async () => {
    jest.spyOn(userService, 'signIn').mockReturnValue(Promise.resolve(mockData.user1));
    const {result, waitForNextUpdate} = render();
    act(() => {
      result.current.onSignIn();
    });
    await waitForNextUpdate();
    expect(result.current.user).toBeTruthy();
    expect(result.current.user?.getFullName()).toBe('Quan Nguyen');
    expect(result.current.hasSignedIn).toBe(true);
  });

  test('Sign in failure', async () => {
    jest.spyOn(userService, 'signIn').mockReturnValue(Promise.reject({}));
    const {result, waitForNextUpdate} = render();
    act(() => {
      result.current.onSignIn();
    });
    await waitForNextUpdate();
    expect(result.current.user).toBeFalsy();
    expect(result.current.hasSignedIn).toBe(false);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
