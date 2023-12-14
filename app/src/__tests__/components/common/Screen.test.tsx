import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import Screen from '../../../components/common/Screen'

describe('Screen', () => {
  test('renders children properly', () => {
    const { getByText } = render(
      <Screen>
        <Text>Hello, World!</Text>
      </Screen>
    );

    expect(getByText('Hello, World!')).toBeTruthy();
  });

  // Add more tests as needed for specific scenarios or edge cases
});
