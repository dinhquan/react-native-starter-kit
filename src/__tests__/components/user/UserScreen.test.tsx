import {fireEvent, render} from '@testing-library/react-native';
import UserScreen from 'app/components/user/UserScreen';
import * as useUserScreen from 'app/components/user/useUserScreen';
import {jsonToClass} from 'core/common/classTransformer';
import User from 'core/models/user/User';
import React from 'react';
import mockData from '../../utils/mockData';

function renderComponent() {
  return render(<UserScreen />);
}

describe('Tests for UserScreen', () => {
  test('Not sign in yet', async () => {
    const signInMock = jest.fn();
    jest.spyOn(useUserScreen, 'default').mockReturnValue({
      user: undefined,
      hasSignedIn: false,
      onSignIn: signInMock,
    });

    const {getByTestId} = renderComponent();
    fireEvent.press(getByTestId('sign-in-button'));

    expect(signInMock).toBeCalled();
    const signInLabel = await getByTestId('sign-in-label');
    expect(signInLabel.props.children).toBe('Not Signed In');
  });

  test('Displaying name after signing in', async () => {
    jest.spyOn(useUserScreen, 'default').mockReturnValue({
      user: jsonToClass(mockData.user1, User),
      hasSignedIn: true,
      onSignIn: jest.fn(),
    });

    const {getByTestId, getByText} = renderComponent();

    const signInLabel = await getByTestId('sign-in-label');
    const nameLabel = await getByText('Quan Nguyen');
    expect(signInLabel.props.children).toBe('Signed In');
    expect(nameLabel).toBeTruthy();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
