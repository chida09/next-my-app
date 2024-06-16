import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Home from './page';
import axios from 'axios';
import userEvent from '@testing-library/user-event';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Home component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
  })

  it('should display "登録しました" when registration is successful', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {},
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    });
    render(<Home />);
    const titleInput = screen.getByPlaceholderText('Enter title');
    const saveButton = screen.getByText('Save');

    await userEvent.type(titleInput, 'Test title');
    await userEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText('登録しました')).toBeInTheDocument();
      expect(screen.queryByText('登録に失敗しました')).not.toBeInTheDocument();
    });

    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(mockedAxios.post).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts', {
      title: 'Test title',
      body: 'bar',
      userId: 1,
    });
  });

  it('should display "登録に失敗しました" when registration fails', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {},
      status: 500,
      statusText: 'Internal Server Error',
      headers: {},
      config: {},
    });

    render(<Home />);
    const titleInput = screen.getByPlaceholderText('Enter title');
    const saveButton = screen.getByText('Save');

    await userEvent.type(titleInput, 'Test title');
    await userEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText('登録に失敗しました')).toBeInTheDocument();
      expect(screen.queryByText('登録しました')).not.toBeInTheDocument();
    });

    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(mockedAxios.post).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts', {
      title: 'Test title',
      body: 'bar',
      userId: 1,
    });
  });
});
