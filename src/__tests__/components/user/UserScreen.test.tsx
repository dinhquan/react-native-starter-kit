import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import PostScreen from 'app/components/post/PostScreen';
import * as usePostScreen from 'app/components/post/usePostScreen';
import Post from 'core/models/post/Post';
import {jsonToClass, jsonToClasses} from 'core/common/classTransformer';
import mockData from '../../utils/mockData';
import UserScreen from 'app/components/user/UserScreen';
import * as useUserScreen from 'app/components/user/useUserScreen';
import User from 'core/models/user/User';

function renderComponent() {
  return render(<UserScreen />);
}

describe('Tests for UserScreen', () => {
  test('Renders correctly', () => {
    renderComponent();
  });

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
