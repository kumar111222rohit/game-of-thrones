import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import GlobalFilter from './GlobalFilter';
import { debounce } from '@/app/utils/debounce';

jest.mock('@/app/utils/debounce');

debounce.mockImplementation((fn: any) => fn);

describe('GlobalFilter', () => {
  it('updates input value on change', () => {
    const setFilter = jest.fn();
    const { getByRole } = render(
      <GlobalFilter filter="" setFilter={setFilter} />
    );

    const input = getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(input.value).toBe('test');
  });

  it('calls setFilter after debounce delay', async () => {
    const setFilter = jest.fn();
    const { getByRole } = render(
      <GlobalFilter filter="" setFilter={setFilter} />
    );

    const input = getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });

    await waitFor(() => expect(setFilter).toHaveBeenCalledWith('test'));
  });
});
