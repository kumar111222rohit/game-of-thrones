import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import DebouncedInput from './DebouncedInput';

jest.useFakeTimers();

describe('DebouncedInput', () => {
  test('renders the input and debounces the onChange event', async () => {
    const handleChange = jest.fn();
    const { getByRole } = render(
      <DebouncedInput value="" onChange={handleChange} />
    );

    const input = getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Targareyen' } });

    expect(handleChange).not.toHaveBeenCalled();

    act(() => {
      jest.runAllTimers();
    });

    await waitFor(() => expect(handleChange).toHaveBeenCalledTimes(1));
    expect(handleChange).toHaveBeenCalledWith('Targareyen');
  });

  test('updates the input value on change', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(
      <DebouncedInput value="" onChange={handleChange} />
    );

    const input = getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Aegon' } });

    expect(input.value).toBe('Aegon');
  });
});
