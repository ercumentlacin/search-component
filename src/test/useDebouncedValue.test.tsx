import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { renderHook, act } from '@testing-library/react';

describe('useDebouncedValue', () => {
  it('should debounce value', () => {
    const { result } = renderHook(() => useDebouncedValue(1, 500));

    expect(result.current).toEqual(1);

    act(() => {
      result.current = 2;
    });

    expect(result.current).toEqual(2);

    act(() => {
      result.current = 3;
    });

    expect(result.current).toEqual(3);
  });

  it('setDebouncedValue should be called after debounce', () => {
    const { result } = renderHook(() => useDebouncedValue('hello', 500));

    expect(result.current).toEqual('hello');

    act(() => {
      result.current = 'world';
    });

    expect(result.current).toEqual('world');
  });
});
