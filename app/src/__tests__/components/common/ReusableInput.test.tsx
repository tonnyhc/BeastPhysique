import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ReusableInput from '../../../components/common/ReusableInput';
import {Text} from 'react-native'

describe('ReusableInput', () => {
  const defaultProps = {
    label: 'Username',
    placeholder: 'Enter your username',
    value: '',
    onChange: jest.fn(),
  };

  it('renders correctly with label and placeholder', () => {
    const { getByText, getByPlaceholderText } = render(
      <ReusableInput {...defaultProps} />
    );

    expect(getByText('Username')).toBeTruthy();
    expect(getByPlaceholderText('Enter your username')).toBeTruthy();
  });

  it('calls onChange when text changes', () => {
    const onChangeMock = jest.fn();
    const { getByPlaceholderText } = render(
      <ReusableInput {...defaultProps} onChange={onChangeMock} />
    );

    fireEvent.changeText(getByPlaceholderText('Enter your username'), 'newusername');

    expect(onChangeMock).toHaveBeenCalledWith('newusername');
  });

  it('toggles password visibility when rightIcon is pressed', () => {
    const { getByTestId } = render(
      <ReusableInput
        {...defaultProps}
        label="Password"
        placeholder="Enter your password"
        isPassword
        rightIcon={<Text testID="toggleIcon">Toggle</Text>}
      />
    );

    const toggleIcon = getByTestId('toggleIcon');

    fireEvent.press(toggleIcon);

    // Add assertions based on your component's behavior, for example:
    // - Check if the secureTextEntry prop of TextInput has changed
    // - Check if the passwordVisible state has toggled
  });

  it('displays error message when error prop is provided', () => {
    const { getByText } = render(
      <ReusableInput {...defaultProps} error="Invalid username" />
    );

    expect(getByText('Invalid username')).toBeTruthy();
  });
  // Add more test cases as needed for other component features and behaviors

  it('handles onEndEditing prop', () => {
    const onEndEditingMock = jest.fn();
    const { getByPlaceholderText } = render(
      <ReusableInput {...defaultProps} onEndEditing={onEndEditingMock} />
    );

    fireEvent(getByPlaceholderText('Enter your username'), 'endEditing');

    expect(onEndEditingMock).toHaveBeenCalled();
  });
});
