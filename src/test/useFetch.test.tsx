import { renderHook, act, waitFor } from '@testing-library/react';
import useFetch from '../hooks/useFetch';
import { handlers } from '../mocks/handlers';

// eslint-disable-next-line jest/no-mocks-import
import rickMock from '../__mocks__/rick.json';
import { server } from './server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('useFetch', () => {
  it('should return initial state', () => {
    const props = {};
    const { result } = renderHook(() => useFetch(props));
    expect(result.current).toEqual({
      data: null,
      error: null,
      loading: true,
    });
  });

  it('should return data', () => {
    const props = { query: 'rick' };
    const { result } = renderHook(() => useFetch(props));

    act(() => {
      return server.use(...handlers);
    });

    return waitFor(() => {
      expect(result.current).toEqual({
        data: rickMock.results,
        error: null,
        loading: false,
      });
    });
  });

  it('should return error', () => {
    const props = { query: 'react is awesome' };
    const { result } = renderHook(() => useFetch(props));

    act(() => {
      return server.use(...handlers);
    });

    return waitFor(() => {
      expect(result.current).toEqual({
        data: null,
        error: 'No results found. Please try another search.',
        loading: false,
      });
    });
  });
});
