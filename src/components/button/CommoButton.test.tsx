import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {MgButton} from "./MgButton";

describe('MgButton component', () => {
  test('renders with text', () => {
    const { getByText } = render(<MgButton text="Click me"  variant={"contained"}/>);
    const buttonElement = getByText(/Click me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls onClick prop when clicked', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(<MgButton text="Click me" onClick={onClickMock} variant={"contained"}/>);
    const buttonElement = getByText(/Click me/i);
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalled();
  });

  test('renders disabled button', () => {
    const { getByText } = render(<MgButton text="Click me" disabled variant={"contained"}/>);
    const buttonElement = getByText(/Click me/i);
    expect(buttonElement).toBeDisabled();
  });

  // Add more tests as needed for other props and behaviors
});
