import {render} from '@testing-library/react-native';
import {FontIcon} from 'app/components/base';
import React from 'react';

describe('Tests for FontIcon', () => {
  test('Display title correctly', async () => {
    const {getByText} = render(<FontIcon font="Ionicons" title="Test Title" />);
    const title = await getByText('Test Title');
    expect(title).toBeTruthy();
  });
});
