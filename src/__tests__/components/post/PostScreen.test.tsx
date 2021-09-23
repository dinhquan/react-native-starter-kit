import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import PostScreen from 'app/components/post/PostScreen';
import * as usePostScreen from 'app/components/post/usePostScreen';
import Post from 'core/models/post/Post';
import {jsonToClasses} from 'core/common/classTransformer';
import mockData from '../../utils/mockData';

function renderComponent() {
  return render(<PostScreen />);
}

describe('Tests for PostScreen', () => {
  beforeAll(() => {
    jest.spyOn(usePostScreen, 'default').mockReturnValue({
      posts: jsonToClasses(mockData.postsWithLength2, Post),
    });
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
