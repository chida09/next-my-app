import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from './page';

describe('Home component', () => {
  test('登録が成功した場合、"登録しました"が表示される', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    } as Response);

    render(<Home />);
    const titleInput = screen.getByPlaceholderText('Enter title');
    const saveButton = screen.getByText('Save');

    fireEvent.change(titleInput, { target: { value: 'Test title' } });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText('登録しました')).toBeInTheDocument();
    });
  });

  test('登録が失敗した場合、"登録に失敗しました"が表示される', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('Network error'));

    render(<Home />);
    const titleInput = screen.getByPlaceholderText('Enter title');
    const saveButton = screen.getByText('Save');

    fireEvent.change(titleInput, { target: { value: 'Test title' } });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText('登録に失敗しました')).toBeInTheDocument();
    });
  });
});
