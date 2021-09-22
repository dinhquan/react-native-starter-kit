import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import createMockingStore from '../__helpers/mockStore';
import PostScreen from 'app/components/post/PostScreen';
import {clearMocks, mockUseDispatch} from '../__helpers/mockHooks';

const renderComponent = () =>
  render(
    <Provider store={createMockingStore()}>
      <PostScreen />
    </Provider>,
  );

describe('Tests for <PostScreen />', () => {
  beforeAll(() => {
    mockUseDispatch();
  });

  test('render without crashing', () => {
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
    clearMocks();
  });
});
