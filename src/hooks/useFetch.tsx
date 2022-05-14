import * as React from 'react';
import { RickAndMortyCharacter, Result } from '../types';

type Props = {
  query?: string;
};

const url = 'https://rickandmortyapi.com/api/character/';

function useFetch({ query }: Props) {
  const [data, setData] = React.useState<null | Result[]>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const signal = React.useRef<null | AbortSignal>(null);

  React.useEffect(() => {
    const abortController = new AbortController();
    signal.current = abortController.signal;

    let uri = new URL(url);
    if (query) {
      uri.searchParams.append('name', query);
    }

    setLoading(true);

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
          setData(data.results);
          setLoading(false);
          setError(null);
        }
      })
      .catch((error: DOMException) => {
        setError(error.message);
        setData(null);
        setLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, [query]);

  return { data, error, loading };
}

export default useFetch;
