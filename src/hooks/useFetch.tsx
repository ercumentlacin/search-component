import * as React from 'react';
import { RickAndMortyCharacter, Result } from '../types';

type Props = {
  query?: string;
};

const url = 'https://rickandmortyapi.com/api/character/';

const initialState = {
  data: null,
  error: null,
  loading: false,
};

type IState = Omit<typeof initialState, 'data' | 'error'> & {
  data: Result[] | null;
  error: string | null;
};

function useFetch({ query }: Props) {
  const [{ data, loading, error }, setState] = React.useState(
    initialState as IState
  );
  const signal = React.useRef<null | AbortSignal>(null);

  React.useEffect(() => {
    const abortController = new AbortController();
    signal.current = abortController.signal;

    let uri = new URL(url);
    if (query) {
      uri.searchParams.append('name', query);
    }

    setState({
      ...initialState,
      loading: true,
    });

    fetch(uri.toString(), {
      signal: signal.current,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        if (response.status === 404) {
          throw new Error('No results found. Please try another search.');
        }
        throw new Error('Something went wrong. Please try again later.');
      })
      .then((data: RickAndMortyCharacter) => {
        if (!signal.current?.aborted) {
          setState({
            data: data.results,
            loading: false,
            error: null,
          });
        }
      })
      .catch((error: DOMException) => {
        setState({
          error: error.message,
          loading: false,
          data: null,
        });
      });

    return () => {
      abortController.abort();
    };
  }, [query]);

  return { data, error, loading };
}

export default useFetch;
