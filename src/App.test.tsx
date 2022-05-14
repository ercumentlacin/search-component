import React from 'react';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';
import { renderWithSuspenseFallback } from './test/renderWithSuspenseFallback';

const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('renders the search input', async () => {
    renderWithSuspenseFallback(<App />);

    const svgElement = screen.getByRole('img', {
      name: /loading/i,
    });

    expect(svgElement).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByRole('searchbox')).toBeInTheDocument();
    });
  });

  it('renders the search results', async () => {
    renderWithSuspenseFallback(<App />);

    await waitFor(() => {
      expect(screen.getByRole('searchbox')).toBeInTheDocument();
    });

    const searchInput = screen.getByRole('searchbox') as HTMLInputElement;
    userEvent.type(searchInput, 'rick');

    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          name: /name: rick sanchez/i,
        })
      ).toBeInTheDocument();
    });
  });

  it('renders the search results with a fallback', async () => {
    renderWithSuspenseFallback(<App />);

    await waitFor(() => {
      expect(screen.getByRole('searchbox')).toBeInTheDocument();
    });

    const searchInput = screen.getByRole('searchbox') as HTMLInputElement;
    userEvent.type(searchInput, 'rick');

    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          name: /name: rick sanchez/i,
        })
      ).toBeInTheDocument();
    });

    await waitForElementToBeRemoved(() => screen.queryByText(/rick sanchez/i));

    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          name: /name: rick sanchez/i,
        })
      ).toBeInTheDocument();
    });
  });

  it('no results when search is empty', async () => {
    renderWithSuspenseFallback(<App />);

    await waitFor(() => {
      expect(screen.getByRole('searchbox')).toBeInTheDocument();
    });

    const searchInput = screen.getByRole('searchbox') as HTMLInputElement;
    userEvent.type(searchInput, 'react is awesome');

    await waitFor(() => {
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });
  });
});
