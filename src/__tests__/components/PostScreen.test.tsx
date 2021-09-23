import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import PostScreen from 'app/components/post/PostScreen';
import * as usePostScreen from 'app/components/post/usePostScreen';
import {mockState} from '../__helpers/mockStore';
import Post from 'core/models/post/Post';

function renderComponent() {
  return render(<PostScreen />);
}

const mockData = {
  posts: mockState.posts.data as Post[],
};

describe('Tests for <PostScreen />', () => {
  beforeAll(() => {
    jest.spyOn(usePostScreen, 'default').mockReturnValue(mockData);
  });

  test('Renders correctly', () => {
    renderComponent();
  });

  test('Display the post title', async () => {
    const {getByText} = renderComponent();
    await waitFor(() => expect(getByText('Posts')));
  });

  test('Display the posts', async () => {
    const {getByText} = renderComponent();
    const firstTitle = await getByText('Title 1');
    const secondTitle = await getByText('Title 2');
    expect(firstTitle).toBeTruthy();
    expect(secondTitle).toBeTruthy();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
